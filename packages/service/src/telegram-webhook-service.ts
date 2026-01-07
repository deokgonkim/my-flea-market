import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { DYNAMODB_TABLES } from "@repo/models";
import { TelegramUpdate } from "@repo/telegram";

const region = process.env.AWS_REGION || 'region-not-set';

export class TelegramWebhookService {
  private dynamoDbClient: DynamoDBClient;
  constructor() {
    this.dynamoDbClient = new DynamoDBClient({ region });
  }

  async recordWebhookMessage(update: TelegramUpdate): Promise<void> {
    const params = {
      TableName: DYNAMODB_TABLES.TELEGRAM_WEBHOOKS,
      Item: {
        updateId: update?.update_id,
        fromId: update?.message?.from?.id,
        fromUsername: update?.message?.from?.username,
        message: update?.message,
        callback_query: update?.callback_query,
      },
    };

    try {
      await this.dynamoDbClient.send(new PutCommand(params));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export const telegramWebhookService = new TelegramWebhookService();
