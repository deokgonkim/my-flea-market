const DYNAMODB_PREFIX = process.env.DYNAMODB_PREFIX || 'my-flea-market';

export const DYNAMODB_TABLES = {
  ITEMS: `${DYNAMODB_PREFIX}-items`,
  TELEGRAM_USER: `${DYNAMODB_PREFIX}-telegram-user`,
};
