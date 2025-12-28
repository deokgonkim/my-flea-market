# My Flea Market - Setup Complete! 🎉

This document provides a quick guide to the generated boilerplate code.

## What Has Been Created

A complete Turbo monorepo with two applications:

### 1. **Web Frontend** (`apps/web`)
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Features**: 
  - Server-side rendering
  - Static generation
  - Modern React 18
  - Responsive design with Tailwind

### 2. **Lambda Backend** (`apps/lambda`)
- **Runtime**: Node.js 18
- **Language**: TypeScript
- **Features**:
  - AWS Lambda handlers
  - API Gateway integration
  - Sample CRUD endpoints
  - Serverless Framework configuration

## Project Structure

```
my-flea-market/
├── apps/
│   ├── web/                    # Next.js frontend
│   │   ├── src/
│   │   │   └── app/
│   │   │       ├── globals.css
│   │   │       ├── layout.tsx
│   │   │       └── page.tsx
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── next.config.js
│   │   └── tailwind.config.js
│   │
│   └── lambda/                 # Lambda backend
│       ├── src/
│       │   ├── handlers/
│       │   │   ├── getItems.ts
│       │   │   └── createItem.ts
│       │   └── index.ts
│       ├── package.json
│       ├── tsconfig.json
│       └── serverless.yml
│
├── package.json                # Root package
├── turbo.json                  # Turbo configuration
└── README.md
```

## Quick Start

### Prerequisites
- Node.js 18 or higher
- npm 10.2.4 or higher

### Installation
```bash
npm install
```

### Development

**Run all apps in development mode:**
```bash
npm run dev
```

**Run individual apps:**
```bash
# Web frontend (runs on http://localhost:3000)
cd apps/web
npm run dev

# Lambda backend (TypeScript watch mode)
cd apps/lambda
npm run dev
```

### Building

**Build all apps:**
```bash
npm run build
```

**Build individual apps:**
```bash
# Web frontend
cd apps/web
npm run build

# Lambda backend
cd apps/lambda
npm run build
```

### Linting

**Lint all apps:**
```bash
npm run lint
```

## API Endpoints (Lambda)

The Lambda backend includes two sample endpoints:

### GET /items
Returns a list of flea market items.

**Response:**
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

### POST /items
Creates a new flea market item.

**Request Body:**
```json
{
  "name": "Item Name",
  "price": 100,
  "description": "Item description"
}
```

**Response:**
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

### Frontend (Next.js)

The Next.js app can be deployed to various platforms:

**Vercel (recommended):**
```bash
npm install -g vercel
cd apps/web
vercel
```

**Other platforms:** See [Next.js deployment docs](https://nextjs.org/docs/deployment)

### Backend (Lambda)

Deploy using Serverless Framework:

```bash
# Install Serverless globally
npm install -g serverless

# Configure AWS credentials
serverless config credentials --provider aws --key YOUR_KEY --secret YOUR_SECRET

# Deploy
cd apps/lambda
npm run build
serverless deploy

# Deploy to specific stage
serverless deploy --stage prod
```

## Turbo Commands

Turborepo provides powerful caching and parallel execution:

- `npm run build` - Build all apps (with caching)
- `npm run dev` - Run all apps in development mode
- `npm run lint` - Lint all apps

Turbo automatically:
- Runs tasks in parallel when possible
- Caches build outputs for faster rebuilds
- Handles dependencies between packages

## Next Steps

1. **Customize the Frontend:**
   - Edit `apps/web/src/app/page.tsx` to change the home page
   - Add new pages in `apps/web/src/app/`
   - Modify styles in `apps/web/src/app/globals.css`

2. **Extend the Backend:**
   - Add new Lambda handlers in `apps/lambda/src/handlers/`
   - Update `apps/lambda/serverless.yml` to add new endpoints
   - Connect to databases (DynamoDB, RDS, etc.)

3. **Add Shared Packages:**
   - Create shared TypeScript types in `packages/types/`
   - Add shared utilities in `packages/utils/`
   - Update workspace configuration to use shared packages

4. **Set Up CI/CD:**
   - Add GitHub Actions workflows
   - Configure automated testing
   - Set up deployment pipelines

## Resources

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Serverless Framework Documentation](https://www.serverless.com/framework/docs)
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Troubleshooting

### Builds are slow
Turbo caches build outputs. First build is always slower, subsequent builds are much faster.

### Port conflicts
- Web app uses port 3000 by default
- Change in `apps/web/package.json` if needed

### Lambda deployment issues
- Ensure AWS credentials are configured
- Check IAM permissions
- Verify the `serverless.yml` configuration

## Support

For issues or questions:
1. Check the README files in each app directory
2. Review the relevant documentation links above
3. Open an issue in the repository

---

Happy coding! 🚀
