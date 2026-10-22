# SPIRE — Part 2

A plant shop rebuilt with Next.js App Router.

## Getting Started

Use Node.js 24 LTS and install dependencies:

```bash
npm ci
```

Create `.env.local` in the project root and add your Trefle API token:

```env
TREFLE_API_TOKEN=your_token_here
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run lint
npm run build
```

## Deployment

[View SPIRE](https://plantshop-part-2.vercel.app/)

GitHub Actions runs lint and build on pushes and pull requests to `main`.
Vercel automatically deploys pushes to `main`.

Set `TREFLE_API_TOKEN` in GitHub Actions secrets and Vercel environment variables.

## Credits

Plant data: [Trefle.io](https://trefle.io/) — CC BY 4.0.
