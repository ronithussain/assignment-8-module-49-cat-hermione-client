<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

Next.js 16.4.3 (App Router), React 19.3.0, TypeScript strict, Tailwind CSS v4. This is the **client** side of the client-and-server assignment; the server is a sibling directory, not part of this repo.

Path alias: `@/*` → `./src/*` (e.g. `@/components/ui/button`, `@/lib/utils`).

## Commands

- `npm run dev` — dev server (Turbopack), port 3000. Re-adds the top AGENTS.md block.
- `npm run build` — production build (also the closest thing to a CI check).
- `npm run start` — production server.
- `npm run lint` — ESLint (eslint-config-next: core-web-vitals + typescript rules).
- `npx tsc --noEmit` — typecheck (tsconfig `noEmit: true`, strict).

No test runner is configured (no vitest/jest, no `test` script). Verification = `lint`, `tsc --noEmit`, then `build`.

## Stack & conventions

- Styling: Tailwind v4. Config is in `src/app/globals.css` (`@import "tailwindcss"`, `@theme inline`, `@custom-variant dark`). There is **no** `tailwind.config.ts`. Keep the `tw-animate-css` and `shadcn/tailwind.css` imports intact.
- UI primitives: `@base-ui/react` wrapped by shadcn-style components in `src/components/ui/` (`button`, `avatar`, `dropdown-menu`, `sonner`). Use `Button` from `@/components/ui/button` (passes `data-slot="button"`), not raw `<button>`.
- Utility: `cn` from `@/lib/utils` (re-exports the `cn` package). Do not import `clsx`/`tailwind-merge` directly.
- Icons: `lucide-react`. Variants: `class-variance-authority` (`cva`).
- React Compiler: `reactCompiler: true` is on in `next.config.ts`. Memoization is automatic — do not add `useMemo`/`React.memo`/`useCallback` unless profiling shows a need.

## Auth

`better-auth` + `@better-auth/mongo-adapter` + `mongodb` driver. Server auth config is `src/lib/auth.ts`; client is `src/lib/auth-client.ts` (`baseURL: process.env.BETTER_AUTH_URL`). Auth pages live under `src/app/(auth)/` (`login`, `profile`, `signup`); the Next.js handler is `src/app/api/auth/[...all]/route.ts`.

Required env vars (create a local `.env` — it is **gitignored**, not committed): `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGODB_URI`, `GOOGLE_CLIENT`, `GOOGLE_SECRET`. Social login (Google only; GitHub is commented out in `src/lib/auth.ts`) only works when those secrets are set.

## Cross-service gotcha

`src/app/(private)/create-event/page.tsx` POSTs to `http://localhost:7000/events` (and `upcoming-events/page.tsx` fetches `http://localhost:7000/upcoming-events`). The client dev server runs on 3000, but these require the **sibling server running on port 7000**.

## Gotchas

- ESLint ignores `.next/**`, `out/**`, `build/**`, `next-env.d.ts`.
- `tsconfig` includes `.next/types/**` and `.next/dev/types/**`.
- `.env` and `*.tsbuildinfo` are gitignored (not committed).
