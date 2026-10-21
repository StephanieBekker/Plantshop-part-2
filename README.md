# SPIRE — Part 2

A plant shop rebuilt with Next.js App Router for a school assignment.

## Requirements

- Node.js 24 LTS
- npm

## Install and run

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

## Checks

```bash
npm run lint
npm run build
```

## Project structure

- `src/app`: routes, shared layout and styles
- `src/components`: reusable components
- `src/data`: product and plant-care data
- `public`: images and icons

## Current status

The project foundation is being prepared. Product pages, server data
fetching, cart interactions and checkout are not implemented yet.

## Continuous integration

GitHub Actions installs dependencies with `npm ci`, runs ESLint and
builds the application on pushes and pull requests to `main`.

## Credits

Plant information: Trefle.io.
