const keySchema = [{ AttributeName: 'telegramUserId', KeyType: 'HASH' }];
const attributeDefinitions = [
  { AttributeName: 'telegramUserId', AttributeType: 'N' },
  { AttributeName: 'username', AttributeType: 'S' },
  { AttributeName: 'createdAt', AttributeType: 'S' },
];

const globalSecondaryIndexes = [
  {
    IndexName: 'username-index',
    KeySchema: [{ AttributeName: 'username', KeyType: 'HASH' }],
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

const billingMode: 'PROVISIONED' | 'PAY_PER_REQUEST' = 'PAY_PER_REQUEST';
const provisionedThroughput = undefined; // Not needed for PAY_PER_REQUEST

export const TelegramUserTableDefinition = {
  keySchema,
  attributeDefinitions,
  billingMode,
  provisionedThroughput,
  globalSecondaryIndexes,
};
