# Gemini Project Overview

This document summarizes the key aspects of the "My Flea Market" project, synthesized from the available `README.md` and `SETUP_GUIDE.md` files, to serve as a quick reference for AI development.

## Project Architecture

This project utilizes a **Turborepo monorepo** structure, comprising two main applications:

-   **apps/web**: The frontend application built with Next.js 14.
-   **apps/lambda**: The serverless backend built with TypeScript AWS Lambda.

## Tech Stack

### Frontend (apps/web)
-   **Framework**: Next.js 14 with App Router
-   **UI Library**: React 18
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS

### Backend (apps/lambda)
-   **Runtime**: Node.js 18
-   **Language**: TypeScript
-   **Platform**: AWS Lambda
-   **Orchestration**: Serverless Framework
-   **Integration**: API Gateway

## Getting Started

### Prerequisites
-   Node.js 18 or higher
-   npm 10.2.4 or higher

### Installation
From the project root:
```bash
npm install
```

### Development
To run all applications in development mode:
```bash
npm run dev
```

Individual app development:
-   **Web Frontend**: `cd apps/web && npm run dev` (runs on `http://localhost:3000`)
-   **Lambda Backend**: `cd apps/lambda && npm run dev` (TypeScript watch mode)

### Building
To build all applications:
```bash
npm run build
```

Individual app builds:
-   **Web Frontend**: `cd apps/web && npm run build`
-   **Lambda Backend**: `cd apps/lambda && npm run build`

### Linting
To lint all applications:
```bash
npm run lint
```

## API Endpoints (Lambda)

The backend provides sample CRUD endpoints:

### `GET /items`
-   **Description**: Returns a list of flea market items.
-   **Example Response**:
    ```json
    {
      "message": "Successfully retrieved items",
      "items": [
        {
          "id": "1",
          "name": "Vintage Camera",
          "price": 150,
          "description": "Classic film camera in excellent condition"
        }
      ]
    }
    ```

### `POST /items`
-   **Description**: Creates a new flea market item.
-   **Request Body Example**:
    ```json
    {
      "name": "Item Name",
      "price": 100,
      "description": "Item description"
    }
    ```
-   **Example Response**:
    ```json
    {
      "message": "Item created successfully",
      "item": {
        "id": "generated-id",
        "name": "Item Name",
        "price": 100,
        "description": "Item description",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    }
    ```

## Deployment

### Frontend
Deployable to platforms like Vercel (recommended) or any Next.js-compatible host.

### Backend
Deployed using the Serverless Framework:
```bash
# Install Serverless globally (if not already)
npm install -g serverless

# Configure AWS credentials (if not already)
serverless config credentials --provider aws --key YOUR_KEY --secret YOUR_SECRET

# Deploy from apps/lambda directory
cd apps/lambda
npm run build
serverless deploy
# For specific stage: serverless deploy --stage prod
```

## Troubleshooting

-   **Slow Builds**: Turborepo uses caching; first builds are slower.
-   **Port Conflicts**: Web app uses port `3000`. Adjust in `apps/web/package.json` if needed.
-   **Lambda Deployment Issues**: Verify AWS credentials, IAM permissions, and `serverless.yml` configuration.
