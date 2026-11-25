# Foundation decision log

## 2026-11-25 — Common foundation

- Kept the locked React/Vite/TypeScript/npm and Supabase architecture.
- Pinned Node 22.22.2, which satisfies the required Node 22 LTS baseline and the current ESLint/jsdom engine floors. The project rejects Node 23+ through `engines`.
- Pinned TypeScript 6.0.3 because the selected `typescript-eslint` release supports TypeScript versions below 6.1; the registry's TypeScript 7 release is therefore not compatible with the agreed lint toolchain.
- Used one canonical Zod contract source with a checked Edge copy to prevent frontend/function drift.
- Registered all planned paths as metadata but mounted only the foundation, forbidden and catch-all routes; feature owners will attach their routes after implementing authorization and screens.
- Configured one generated PWA service worker that caches static hashed assets only. No API, private data, signed media or map-tile runtime cache is configured.
- Added local Supabase configuration only. No remote project, migration or domain seed was created.
- The production dependency audit is clean. The current PWA build toolchain has four moderate transitive `glob`/`minimatch` advisories; npm proposes a breaking downgrade to `vite-plugin-pwa` 1.1.0, so no unsafe forced change was applied. Recheck when Workbox/vite-plugin-pwa publish a compatible fix.
