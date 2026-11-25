# Repository instructions

`PROJECT_SPEC.md` is the canonical product, design, data, API, security and delivery specification. Before any change, read it in full. If this guide conflicts with it, the specification wins; report the conflict rather than inventing behavior. Preserve the approved requirements and work only within the assigned package in section 11.

## Delivery schedule

| Days | Focus |
|---|---|
| Days 1–3 | Parallel development on owned modules against the shared contracts and deterministic mocks. |
| Days 4–5 | Staging integration; merge early, resolve contract seams, and keep `main` buildable. |
| Day 6 | System testing against the section 13 acceptance matrix, including security, concurrency, responsive UI and deployment checks. |
| Days 7–9 | Approved, reproducible research experiments and paper preparation; do not fabricate findings or weaken the tested application baseline. |

P0 must pass for the nine-day MVP. Defer P1 before compromising P0, security, data integrity or honest reporting.

## Shared architecture and boundaries

- Build one mobile-first React + TypeScript/Vite application with shared UI, one Supabase backend and role-based routes; do not create separate resident/admin applications or backends.
- Use the locked stack in section 2: React Router, Tailwind/shadcn/Lucide, React Hook Form/Zod, TanStack Query, Supabase, MapLibre, i18next, PWA/Dexie, and the specified test tooling. Do not add packages, change frameworks, alter lockfiles or use another package manager without review.
- Frontend requests go only through `src/shared/api`; live and mock adapters have identical typed contracts. `VITE_DATA_MODE` is explicit, production defaults to live, and mock mode shows a permanent DEMO banner.
- Respect ownership: Anuj owns `src/features/citizen`, shared UI/theme/i18n and PWA; Jeevesh owns migrations, API/DB/auth, admin feature, CI and deployment configuration; Jai owns the AI worker, shared AI code and research. Jeevesh is the sole migration writer. Shared folders, contracts, routes, dependencies and another owner’s files require review.
- Keep browser code separate from Edge code. The browser never invokes `ai-worker`; it uses the single `api` Edge Function. See sections 3, 7, 8 and 11 for exact folder, interface and ownership rules.

## Coding, UI, data and API rules

- Use strict TypeScript; database columns and wire JSON are `snake_case`, components/types PascalCase, local identifiers camelCase, route paths kebab-case, and UTC ISO 8601 dates. Human-facing reference IDs are not UUIDs or authentication tokens.
- Treat section 6 as the source of truth for enums, tables, state transitions, invariants and terminology. `Issue` is the canonical civic problem; `Report` is an individual submission. Never invent statuses, categories, columns or relationships.
- Treat section 7 as the only wire contract: versioned `Request`/`Result` envelopes, Zod validation, opaque cursors, idempotent mutation `request_id`s and optimistic `expected_version` checks. Contract changes need a reviewed decision note, affected-owner approval, schema/fixture updates and tests before implementation.
- Use the shared token system and components from section 4 for both roles. All strings use i18next with matching `en`/`ta` keys. Meet WCAG AA, 44px targets, visible focus, text-plus-icon status indicators, 360/390/768/1280px layouts and no horizontal overflow outside deliberate scrolling.
- Do not hard-code a product name; use `APP_NAME` / `VITE_APP_NAME`. Do not use fake data or success states in live mode, placeholders in required flows, unreviewed AI output as fact, or claims of completed testing/research without evidence.

## Security and privacy

- Authentication is not authorization. Every server action verifies the JWT, active membership, role, village and ownership; never trust client-supplied role, status, deadlines, reporter IDs, AI results or points.
- All domain reads/writes use `api`; preserve RLS, private `issue-media` storage, short-lived signed URLs, server-side media reservation/validation, request receipts, rate limits and audited workflow changes. Never expose service-role credentials, Gemini/FCM secrets or real keys in browser code, commits, logs, screenshots or `.env.example`.
- Keep resident identities, exact locations, private evidence and internal notes out of public DTOs, feeds, Realtime payloads and notifications. Use consent and redaction before optional external AI processing. Render user content as text, not unsafe HTML.
- AI only suggests; it never changes official status, assignment, merge, resolution or priority. Preserve manual fallback when AI is unavailable, failed or declined. Follow sections 8–10 for worker, offline, map and data-lifecycle controls.

## Collaboration and verification

- Work in short-lived branches from the shared foundation commit. No direct `main` pushes, force-pushes to shared branches, deployment, production credential changes, destructive remote database resets or unreviewed migrations.
- Keep PRs scoped and small. State package/feature IDs, owned files, contract changes, tests/results, privacy/security impact, limitations and rollback. Each merged PR must build; integration happens in staging during Days 4–5.
- Run the relevant tests while developing. Before release, run the commands and acceptance evidence required by section 13; report actual outputs and known failures. Do not merge failing CI or silently substitute mocks for live behavior.
- If an instruction conflicts, an interface is missing, or a dependency is blocked, stop and report it to the team instead of guessing.
