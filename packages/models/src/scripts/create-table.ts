
import { DynamoDBManager } from '@repo/dynamodb-manager';
import { DYNAMODB_TABLES } from '../constants/dynamodb-tables';

const region = process.env.AWS_REGION || 'region-not-set';

const manager = new DynamoDBManager(region);

const keySchema = [{ AttributeName: 'id', KeyType: 'HASH' }];
const attributeDefinitions = [
  { AttributeName: 'id', AttributeType: 'S' },
  { AttributeName: 'slug', AttributeType: 'S' },
  { AttributeName: 'createdAt', AttributeType: 'S' },
];

const globalSecondaryIndexes = [
  {
    IndexName: 'slug-index',
    KeySchema: [{ AttributeName: 'slug', KeyType: 'HASH' }],
    Projection: {
      ProjectionType: 'ALL',
    },
  },
  {
    IndexName: 'createdAt-index',
    KeySchema: [{ AttributeName: 'createdAt', KeyType: 'HASH' }],
    Projection: {
      ProjectionType: 'ALL',
    },
  },
];

async function createTable() {
  await manager.createTable(
    DYNAMODB_TABLES.ITEMS,
    keySchema,
    attributeDefinitions,
    'PAY_PER_REQUEST', // Use On-Demand billing
    undefined, // No provisioned throughput needed
    globalSecondaryIndexes
  );
  console.log('Table creation script finished.');
}

createTable();
