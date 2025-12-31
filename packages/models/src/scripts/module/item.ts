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

const billingMode: 'PROVISIONED' | 'PAY_PER_REQUEST' = 'PAY_PER_REQUEST';
const provisionedThroughput = undefined; // Not needed for PAY_PER_REQUEST

export const ItemTableDefinition = {
  keySchema,
  attributeDefinitions,
  billingMode,
  provisionedThroughput,
  globalSecondaryIndexes,
};
