# Notifier Backend

TypeScript-based AWS Lambda functions for the My Flea Market Notifier.

## Features

- TypeScript for type safety
- Serverless Framework configuration

## Structure

TBD

## Development

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Watch mode
npm run dev

# Lint
npm run lint
```

## Deployment

The lambda functions can be deployed using the Serverless Framework:

```bash
# Install serverless globally
npm install -g serverless

# Deploy to AWS
serverless deploy

# Deploy to specific stage
serverless deploy --stage prod

# Remove deployment
serverless remove
```

## Local Testing

You can test the Lambda functions locally using serverless-offline:

```bash
# Install plugin
npm install --save-dev serverless-offline

# Start local server
serverless offline
```

## API Endpoints

TBD

## Environment Variables

Set these in your serverless.yml or .env file:

- `STAGE` - Deployment stage (dev, staging, prod)
