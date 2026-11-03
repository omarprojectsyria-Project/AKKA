# AKKA Electromechanical Contracting

Company website showcasing AKKA's services, projects, careers and contact information.

Built with React, TypeScript, Vite and Tailwind CSS.

## Local development

Use Node.js 22 and pnpm 10.34.3.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## Validation and production build

```sh
pnpm typecheck
pnpm build
pnpm preview
```

The production files are written to `dist/`.

## Deployment

Import this repository into Vercel with the Vite preset and the repository root as the root directory. Build and output settings, including direct page navigation, are defined in `vercel.json`. No environment variables are required for the current website.

## Company review

This version is prepared for company review. Search engine indexing is disabled in `index.html` and `public/robots.txt` until the public launch.

Contact and career forms prepare messages in the visitor's email application. Visitors send the message themselves and attach their CV when applicable. Automatic submissions and document uploads can be connected after approval.
