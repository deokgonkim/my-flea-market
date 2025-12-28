# Web Frontend

Next.js 14 web application for My Flea Market.

## Features

- Next.js 14 with App Router
- React 18
- TypeScript for type safety
- Tailwind CSS for styling
- ESLint for code quality

## Structure

```
src/
└── app/
    ├── globals.css      # Global styles
    ├── layout.tsx       # Root layout
    └── page.tsx         # Home page
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint
npm run lint
```

## Available Scripts

- `npm run dev` - Starts the development server on http://localhost:3000
- `npm run build` - Creates an optimized production build
- `npm run start` - Runs the production build
- `npm run lint` - Runs ESLint to check for code quality issues

## Styling

This project uses Tailwind CSS for styling. Configuration can be found in:
- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration
- `src/app/globals.css` - Global styles and Tailwind directives
