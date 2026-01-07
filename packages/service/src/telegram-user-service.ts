import {
  DynamoDBClient,
} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';
import { DYNAMODB_TABLES, MyTelegramUser } from "@repo/models";

const region = process.env.AWS_REGION || 'region-not-set';

export class TelegramUserService {
  private docClient: DynamoDBDocumentClient;

  constructor(region: string) {
    const client = new DynamoDBClient({ region });
    this.docClient = DynamoDBDocumentClient.from(client);
  }

  public async getAdminUsers(): Promise<MyTelegramUser[]> {
    const command = new ScanCommand({
      TableName: DYNAMODB_TABLES.TELEGRAM_USER,
      FilterExpression: 'isAdmin = :isAdmin',
      ExpressionAttributeValues: {
        ':isAdmin': true,
      },
      ProjectionExpression: 'telegramUserId',
    });
    const { Items  } = await this.docClient.send(command);
    return Items as MyTelegramUser[];
  }
}

export const telegramUserService = new TelegramUserService(region);
