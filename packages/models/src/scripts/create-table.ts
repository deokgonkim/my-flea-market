
import { DynamoDBManager } from '@repo/dynamodb-manager';
import { DYNAMODB_TABLES } from '../constants/dynamodb-tables';
import { ItemTableDefinition } from './module/item';
import { TelegramUserTableDefinition } from './module/telegram';

const region = process.env.AWS_REGION || 'region-not-set';

const manager = new DynamoDBManager(region);

async function createTable() {
  if (!await manager.tableExists(DYNAMODB_TABLES.ITEMS)) {
    await manager.createTable(
      DYNAMODB_TABLES.ITEMS,
      ItemTableDefinition.keySchema,
      ItemTableDefinition.attributeDefinitions,
      ItemTableDefinition.billingMode,
      ItemTableDefinition.provisionedThroughput,
      ItemTableDefinition.globalSecondaryIndexes
    );
  }

  if (!await manager.tableExists(DYNAMODB_TABLES.TELEGRAM_USER)) {
    await manager.createTable(
      DYNAMODB_TABLES.TELEGRAM_USER,
      TelegramUserTableDefinition.keySchema,
      TelegramUserTableDefinition.attributeDefinitions,
      TelegramUserTableDefinition.billingMode,
      TelegramUserTableDefinition.provisionedThroughput,
      TelegramUserTableDefinition.globalSecondaryIndexes
    );
  }
  console.log('Table creation script finished.');
}

createTable();
