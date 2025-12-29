# Repository Guidelines

## Project Structure & Module Organization
This is a Turborepo monorepo with apps and shared packages.
- `apps/web`: Next.js 14 frontend (App Router) in `apps/web/src/app`.
- `apps/lambda`: AWS Lambda backend in `apps/lambda/src/handlers`.
- `packages/models`: shared TypeScript models and scripts.
- `packages/dynamodb-manager`: DynamoDB client utilities.
- Root config lives in `package.json`, `turbo.json`, and `.prettierrc`.

## Build, Test, and Development Commands
Run commands from the repo root unless noted.
- `npm install`: install all workspace dependencies.
- `npm run dev`: run all apps in dev mode via Turborepo.
- `npm run build`: build all workspaces.
- `npm run lint`: lint all workspaces.
- `npm run format`: format `ts/tsx/md` files with Prettier.
- `cd apps/web && npm run dev|build|start|lint`: web app dev/build/start/lint.
- `cd apps/lambda && npm run dev|build|lint|clean`: Lambda dev (serverless offline), build, lint, clean.

## Coding Style & Naming Conventions
- TypeScript throughout; use 2-space indentation and single quotes (see `.prettierrc`).
- No semicolons by default; run `npm run format` before committing.
- Lambda handlers live in `apps/lambda/src/handlers` and use verb-based names (e.g., `getItems.ts`).
- Next.js routes follow the App Router folder structure under `apps/web/src/app`.

## Testing Guidelines
No automated test framework is configured yet. Validate changes manually:
- Web UI: `cd apps/web && npm run dev`, then verify routes in the browser.
- API: `cd apps/lambda && npm run dev`, then call endpoints (see `apps/lambda/API.md`).

## Commit & Pull Request Guidelines
- Commit messages follow Conventional Commits seen in history: `feat:`, `fix:`, `chore:`.
- PRs should include a concise summary, testing steps, and screenshots for UI changes.
- Call out API/DB schema changes and update relevant docs (`README.md`, `apps/lambda/API.md`) when needed.

## Configuration & Environment
- Node.js >= 18 and npm 10.2.4 are required.
- Lambda stage configuration is in `apps/lambda/serverless.yml`.
- DynamoDB scripts in `packages/models` use `.env.production` and `.env.development.local`.
