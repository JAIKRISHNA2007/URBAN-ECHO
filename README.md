# Rural Civic Issue Reporting & Resolution

This repository currently contains the common foundation for one mobile-first React application shared by residents and authorized Gram Panchayat staff. `PROJECT_SPEC.md` is canonical; `AGENTS.md` summarizes the operating rules.

The foundation includes the application shell, shared design tokens, bilingual i18n setup, planned-route registry, typed API boundary, canonical Zod contracts, deterministic fixtures, Supabase local configuration, PWA generation, tests and CI. Citizen workflows, staff workflows, database migrations and AI behavior are intentionally not implemented yet.

## Required runtimes

- Node.js `22.22.2` (pinned in `.nvmrc`; satisfies the specification's Node 22 LTS requirement)
- npm `11.17.0` (recorded in `package.json`)
- Python `3.12` for later research work (pinned in `research/.python-version`)
- Docker-compatible runtime only when local Supabase is started

## Setup

```powershell
npm ci
Copy-Item .env.example .env.local
npm run contracts:check
npm run dev
```

The example environment selects explicit mock mode and uses safe dummy browser values. Never put server, service-role, database, Gemini or FCM server credentials in a `VITE_` variable. In live mode, configure a development Supabase URL and publishable key through an untracked `.env.local` file.

## Quality commands

```powershell
npm run typecheck
npm run lint
npm run format:check
npm run test
npm run build
npm run test:e2e
```

Run `npm run contracts:sync` after an approved change under `src/shared/contracts`; CI uses `npm run contracts:check` to reject frontend/Edge drift.

## Local Supabase

No remote Supabase project is created or linked. When Docker is available, use only the local project:

```powershell
npm run supabase -- start
npm run supabase -- functions serve
```

`supabase db reset` is allowed only for the local instance. The migration and seed directories are deliberately empty of domain schema/data until the backend owner submits the reviewed canonical migration.

## Module ownership

- Shared foundation: `src/app`, `src/shared/api`, `src/shared/contracts`, deterministic mocks and repository tooling.
- Citizen experience: `src/features/citizen`, shared UI/theme/i18n stewardship and `src/pwa`.
- Backend/administration: migrations, API/DB/auth adapters, `src/features/admin`, CI and deployment configuration.
- AI/research: `supabase/functions/ai-worker`, `_shared/ai` and `research`.

Do not implement across an owner boundary or change a shared contract without review. See sections 3, 7, 11 and 12 of `PROJECT_SPEC.md` for the complete rules.
