import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { TelegramUser } from '@repo/telegram';
import { DYNAMODB_TABLES } from './constants/dynamodb-tables';

export interface MyTelegramUser {
  // my definitions
  telegramUserId: number;
  isAdmin: boolean;

  // Telegram User
  isBot: boolean;
  firstName?: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
}

export interface TelegramWebhookMessage {
  updateId: number;
  fromId: number;
  fromUsername?: string | undefined;
  message?: any;
}


const region = process.env.AWS_REGION || 'region-not-set';

export class MyTelegramUserManager {
  private docClient: DynamoDBDocumentClient;

  constructor(region: string) {
    const client = new DynamoDBClient({ region });
    this.docClient = DynamoDBDocumentClient.from(client);
  }

  async getTelegramUser(telegramUserId: number): Promise<MyTelegramUser | null> {
    const params = {
      TableName: DYNAMODB_TABLES.TELEGRAM_USER,
      Key: { telegramUserId },
    };
    const command = new GetCommand(params);
    const { Item: user } = await this.docClient.send(command);
    return (user as MyTelegramUser) || null;
  }

  async addTelegramUser(user: TelegramUser): Promise<void> {
    const params = {
      TableName: DYNAMODB_TABLES.TELEGRAM_USER,
      Item: {
        ...user,
        telegramUserId: user.id,
        isAdmin: false,
      },
    };
    const command = new PutCommand(params);
    await this.docClient.send(command);
  }

  async addOrUpdateTelegramUser(user: TelegramUser): Promise<void> {
    const existingUser = await this.getTelegramUser(user.id);
    if (existingUser) {
      // Update existing user
      const params = {
        TableName: DYNAMODB_TABLES.TELEGRAM_USER,
        Item: {
          ...existingUser,
          ...user,
          telegramUserId: user.id,
        },
      };
      const command = new PutCommand(params);
      await this.docClient.send(command);
    } else {
      await this.addTelegramUser(user);
    }
  }
}

export const myTelegramUserManager = new MyTelegramUserManager(region);
