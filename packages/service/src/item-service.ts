import {
  DynamoDBClient,
} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  ScanCommand,
  QueryCommand,
  PutCommand,
  GetCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { Item, DYNAMODB_TABLES, ItemSubscription } from '@repo/models';
import { randomUUID } from 'crypto';

const region = process.env.AWS_REGION || 'region-not-set';

export class ItemService {
  private docClient: DynamoDBDocumentClient;

  constructor(region: string) {
    const client = new DynamoDBClient({ region });
    this.docClient = DynamoDBDocumentClient.from(client);
  }

  async checkSlugUniqueness(slug: string) {
    const params = {
      TableName: DYNAMODB_TABLES.ITEMS,
      IndexName: 'slug-index', // Use GSI if available
      KeyConditionExpression: 'slug = :slug',
      ExpressionAttributeValues: {
        ':slug': slug,
      },
    };
    const command = new QueryCommand(params);
  
    const result = await this.docClient.send(command);
    return result.Items && result.Items.length > 0;
  }

  async getItems(): Promise<Item[]> {
    const command = new ScanCommand({
      TableName: DYNAMODB_TABLES.ITEMS,
      // exclude deleted items
      FilterExpression: 'attribute_not_exists(deletedAt)',
    });
    const { Items } = await this.docClient.send(command);
    return (Items as Item[]) || [];
  }

  async getItem(id: string): Promise<Item | null> {
    const command = new GetCommand({
      TableName: DYNAMODB_TABLES.ITEMS,
      Key: { id },
    });
    const { Item: item } = await this.docClient.send(command);
    return (item as Item) || null;
  }

  async getItemBySlug(slug: string): Promise<Item | null> {
    const params = {
      TableName: DYNAMODB_TABLES.ITEMS,
      IndexName: 'slug-index', // Use GSI if available
      KeyConditionExpression: 'slug = :slug',
      FilterExpression: 'attribute_not_exists(deletedAt)', // Exclude deleted items
      ExpressionAttributeValues: {
      ':slug': slug,
      },
    };
    const command = new QueryCommand(params);
    const { Items } = await this.docClient.send(command);
    if (Items && Items.length > 0) {
      return Items[0] as Item;
    }
    return null;
  }

  /**
   * Create a new item
   * @param itemData 
   * @returns 
   * @throws Error if slug is not unique
   */
  async createItem(itemData: Omit<Item, 'id'>): Promise<Item> {
    const isSlugTaken = await this.checkSlugUniqueness(itemData.slug);
    if (isSlugTaken) {
      throw new Error(`Slug "${itemData.slug}" already exists.`);
    }

    const newItem: Item = {
      id: randomUUID(),
      ...itemData,
      createdAt: new Date().toISOString(),
    };
    const command = new PutCommand({
      TableName: DYNAMODB_TABLES.ITEMS,
      Item: newItem,
    });
    await this.docClient.send(command);
    return newItem;
  }

  /**
   * Update an existing item
   * @param id 
   * @param item 
   * @returns 
   * @throws Error if slug is not unique
   */
  async updateItem(id: string, item: Partial<Item>): Promise<Item> {
    const newAttributes: Partial<Item> = { ...item };
    const updateExpressions: string[] = [];
    const expressionAttributeNames: { [key: string]: string } = {};
    const expressionAttributeValues: { [key: string]: unknown } = {};
  
    for (const key of Object.keys(item) as (keyof Item)[]) {
      if (key === 'id' || key === 'createdAt') continue; // Skip id and createdAt
      updateExpressions.push(`#${key} = :${key}`);
      expressionAttributeNames[`#${key}`] = key;
      expressionAttributeValues[`:${key}`] = newAttributes[key];
    }
  
    const command = new UpdateCommand({
      TableName: DYNAMODB_TABLES.ITEMS,
      Key: { id },
      UpdateExpression: `SET ${updateExpressions.join(", ")}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
    });
    if (item.slug) {
      const isSlugTaken = await this.checkSlugUniqueness(item.slug);
      if (isSlugTaken) {
        throw new Error(`Slug "${item.slug}" already exists.`);
      }
    }
    await this.docClient.send(command);
    const updatedItem = await this.getItem(id);
    if (!updatedItem) {
      throw new Error('Failed to retrieve updated item');
    }
    return updatedItem;
  }

  async deleteItem(id: string): Promise<void> {
    // const command = new DeleteCommand({
    //   TableName: DYNAMODB_TABLES.ITEMS,
    //   Key: { id },
    // });
    const command = new UpdateCommand({
      TableName: DYNAMODB_TABLES.ITEMS,
      Key: { id },
      UpdateExpression: 'SET deletedAt = :deletedAt',
      ExpressionAttributeValues: {
        ':deletedAt': new Date().toISOString(), // Soft delete by setting deletedAt timestamp
      },
    })
    await this.docClient.send(command);
  }

  async likeItem(id: string): Promise<Item | null> {
    const command = new UpdateCommand({
      TableName: DYNAMODB_TABLES.ITEMS,
      Key: { id },
      UpdateExpression: 'SET likes = if_not_exists(likes, :start) + :inc',
      ExpressionAttributeValues: {
        ':inc': 1,
        ':start': 0,
      },
    });
    await this.docClient.send(command);
    return this.getItem(id);
  }

  async unlikeItem(id: string): Promise<Item | null> {
    const command = new UpdateCommand({
      TableName: DYNAMODB_TABLES.ITEMS,
      Key: { id },
      UpdateExpression: 'SET likes = if_not_exists(likes, :start) + :inc',
      ExpressionAttributeValues: {
        ':inc': -1,
        ':start': 0,
      },
    });
    await this.docClient.send(command);
    return this.getItem(id);
  }

  async subscribeItem(slug: string, subscriber: ItemSubscription): Promise<void> {
    const existingItem = await this.getItemBySlug(slug);
    if (!existingItem) {
      throw new Error(`Item with slug "${slug}" does not exist.`);
    }
    if (existingItem.subscribers?.length > 0) {
      const existingSubscriberIndex = existingItem.subscribers.findIndex(
        (sub) => sub.telegramUserId === subscriber.telegramUserId
      );
      if (existingSubscriberIndex !== -1) {
        existingItem.subscribers[existingSubscriberIndex] = subscriber;
        await this.updateItem(existingItem.id, { subscribers: existingItem.subscribers });
        return;
      }
      existingItem.subscribers.push(subscriber);
      await this.updateItem(existingItem.id, { subscribers: existingItem.subscribers });
      return;
    } else {
      existingItem.subscribers = [subscriber];
      await this.updateItem(existingItem.id, { subscribers: existingItem.subscribers });
      return;
    }
  }

  async unsubscribeItem(slug: string, subscriber: ItemSubscription): Promise<void> {
    const existingItem = await this.getItemBySlug(slug);
    if (!existingItem) {
      throw new Error(`Item with slug "${slug}" does not exist.`);
    }
    if (existingItem.subscribers?.length > 0) {
      const updatedSubscribers = existingItem.subscribers.filter(
        (sub) => sub.telegramUserId !== subscriber.telegramUserId
      );
      await this.updateItem(existingItem.id, { subscribers: updatedSubscribers });
    }
  }
}

export const itemService = new ItemService(region);
