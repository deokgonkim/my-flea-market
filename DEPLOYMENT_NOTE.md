# DEPLOYMENT_NOTE

## AWS Lambda deploy (apps/lambda)

- CI/CD is run on Github Actions
- Github Actions preparation
  - Environment secrets to be configured
    - AWS_ACCESS_KEY_ID
    - AWS_SECRET_ACCESS_KEY
    - DEPLOYMENT_BUCKET
  - Environment variables to be configured
    - DYNAMODB_PREFIX
- AWS IAM preparation
  - Create IAM User for github action to use
  - Create IAM Role for serverless deployment procedure (aws/cloudformation/role)

## Vercel Deploy (apps/web)

- CI/CD is configured at vercel
