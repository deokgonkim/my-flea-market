# My Flea Market

A modern flea market application built with a Turbo monorepo architecture.

## Architecture

This project uses a monorepo structure powered by [Turborepo](https://turbo.build/repo), containing:

- **apps/web** - Next.js 14 frontend application
- **apps/lambda** - TypeScript AWS Lambda serverless backend

## Tech Stack

### Frontend (apps/web)
- Next.js 14 with App Router
- React 18
- TypeScript
- Tailwind CSS

### Backend (apps/lambda)
- TypeScript
- AWS Lambda
- Serverless Framework
- API Gateway integration

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 10.2.4 or higher

### Installation

```bash
# Install dependencies for all workspaces
npm install
```

### Development

```bash
# Run all apps in development mode
npm run dev

# Build all apps
npm run build

# Lint all apps
npm run lint
```

### Individual App Commands

#### Web Frontend
```bash
cd apps/web
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run linter
```

#### Lambda Backend
```bash
cd apps/lambda
npm run build    # Build TypeScript
npm run dev      # Watch mode
npm run lint     # Run linter
```

## Project Structure

```
my-flea-market/
├── apps/
│   ├── web/           # Next.js frontend
│   └── lambda/        # Lambda backend
├── packages/          # Shared packages (future use)
├── turbo.json         # Turborepo configuration
└── package.json       # Root package.json
```

## Deployment

### Frontend
The Next.js app can be deployed to Vercel, Netlify, or any platform supporting Next.js.

### Backend
Lambda functions can be deployed using the Serverless Framework:

```bash
cd apps/lambda
serverless deploy
```

## Contributing

This is a monorepo managed by Turborepo. When adding new packages or apps:

1. Create the new package in `apps/` or `packages/`
2. Update the workspace configuration if needed
3. Run `npm install` from the root to update dependencies

## License

MIT