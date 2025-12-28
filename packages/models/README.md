# @repo/models

## Add dependency in `package.json`

```json
"dependencies": {
    "@repo/models": "*"
}
```

## Use model

```typescript
import { Item } from "@repo/models";
```

## Script to create tables

- Create `.env.production` and `.env.development.local` file
  ```
  AWS_REGION=ap-northeast-2

  DYNAMODB_PREFIX=my-flea-market-dev
  ```

- Run script
  ```bash
  # for development environment
  npm run create-table-dev
  # for production
  npm run create-table
  ```
