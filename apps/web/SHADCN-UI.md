# Shadcn UI Notes

This repo uses shadcn/ui in `apps/web`. Components are generated into the app so they can be customized and versioned.

## Setup Prerequisites
- Install dependencies from the repo root: `npm install`.
- shadcn config lives at `apps/web/components.json`.
- Tailwind tokens and CSS variables are in `apps/web/src/app/globals.css`.

## Adding Components
Run shadcn CLI from the web app directory so paths resolve correctly.

```bash
cd apps/web
npx shadcn-ui@latest add button
```

Generated files typically go to:
- Components: `apps/web/src/components/ui/`
- Utilities: `apps/web/src/lib/utils.ts`

## Updating Components
- Re-run the CLI to overwrite an existing component, then re-apply local customizations.
- If you made local edits, review diffs carefully before replacing.

## Removing Components
- Delete the component file from `apps/web/src/components/ui/`.
- Clean up any related imports in pages or layouts.

## Styling Notes
- Theme tokens use CSS variables (see `apps/web/src/app/globals.css`).
- Tailwind config includes `tailwindcss-animate` in `apps/web/tailwind.config.js`.

## Troubleshooting
- If classes are missing, confirm Tailwind `content` paths include `src/app` and `src/components`.
- If utilities fail, ensure `@/lib/utils` exists and the `@/*` alias is in `apps/web/tsconfig.json`.
