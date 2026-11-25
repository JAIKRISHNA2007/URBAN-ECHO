# Foundation setup guide

## Frontend

1. Use Node `22.22.2` from `.nvmrc` and npm `11.17.0`.
2. Run `npm ci`.
3. Copy `.env.example` to the ignored `.env.local` file and keep `VITE_DATA_MODE=mock` until an approved local/live backend is available.
4. Run `npm run contracts:check` and `npm run dev`.
5. Open `http://127.0.0.1:5173`.

The default production data mode is live. Mock mode never activates silently and always renders a DEMO banner.

## Local backend tooling

The tracked Supabase configuration is local-only and is not linked to a remote project. Docker is required to run it. Inspect `npm run supabase -- --help` before database or deployment commands. Never reset a remote database.

## Contract workflow

`src/shared/contracts` is canonical. After an approved edit, run `npm run contracts:sync`. This copies only pure TypeScript/Zod contract files to `supabase/functions/_shared/contracts`; `npm run contracts:check` verifies exact equality.

## Research environment

Research is deferred to its owned package. When that phase begins, create an isolated Python 3.12 virtual environment under `research/.venv` and install `research/requirements.txt`. Do not install research packages into the frontend environment or commit private datasets.
