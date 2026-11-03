# AKKA Electromechanical Contracting

Visual prototype for AKKA management review, covering documented services, selected projects, career-interest categories and corporate contact information.

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

Release gate: the current content-accuracy changes require explicit approval of the final local diff before any commit, GitHub push or Vercel deployment. Keep the official company domain and DNS outside this review.

The existing Vite build and SPA route settings remain defined in `vercel.json`. No environment variables are required for this prototype.

## Company review

This version is prepared for company review. Search engine indexing is disabled in `index.html` and `public/robots.txt` until the public launch.

Contact and career-interest forms prepare drafts in the visitor's email application; the website does not send, store or process submissions. Recruitment availability and the appropriate CV recipient need company confirmation.

The supplied prequalification PDF and content-audit records are local review materials only and must not be committed or served as public assets. Project images are explicitly illustrative.
