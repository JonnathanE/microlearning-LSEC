# AGENTS.md — Frontend Microlearning LSEC

Web application to teach Ecuadorian Sign Language (LSEC) through microlearning. Originally built as a university thesis; now being modernized.

- API (separate repo): https://github.com/JonnathanE/api-microlearning-LSEC
- Modernization plan: `docs/PLAN-MODERNIZACION.md` — **read it before starting any task** and tick off checkboxes as items are completed.

## Current state (update as phases complete)

- JavaScript, React 17, Create React App, npm, React Router 5, React Query 3, Tailwind 3 + twin.macro, Jest + Testing Library, Cypress 9.
- **It does not work yet against API `v3.0.0`**: phase 4 of the plan adapts it.
- Target: Node 26, pnpm, Vite, Docker, React 19, TanStack Query, Tailwind 4 without MUI or twin.macro, zod, Vitest, Biome, TypeScript (strict).
- Phase order: 0 baseline → 1 pnpm + cleanup → 2 Vite + Vitest → 3 Docker → 4 API 3.0 → 5 libraries → 6 TypeScript → 7 quality + release. Do not jump ahead.
- Out of scope: refresh token, cookies, API versioning and gamification, which belong to `docs/PLAN-EVOLUCION.md` in the API repo.

## Commands

```bash
npm start              # Create React App dev server (port 3000)
npm run build          # production build into ./build
npm test               # Jest
npm run cypress:open   # E2E tests; they need the API on localhost:5000 with NODE_ENV=test
```

Update this section when phases 1 and 2 land (`pnpm`, `vite`, `vitest`).

Environment variables: `REACT_APP_API_URL` (`<server>/api`), read only in `src/config.js`.

## Structure

```
src/index.js       entry point: QueryClient, AuthProvider and Routes
src/routes/        Routes.js and guards (Private/Public + Student/Admin)
src/auth/          AuthProvider and useAuth; the session lives in localStorage ('user', 'auth')
src/api/           requestMethods (axios clients), apiCallsUser, apiCallsAdmin
src/pages/         one folder per screen, with its test
src/components/    shared components, with their tests
src/hook/          useDarkMode
cypress/           E2E specs and commands
docs/              modernization plan
```

Domain: `Module` → has `Lesson`s → each lesson has `Microlearning`s (learning capsules) and `Card`s (knowledge cards with question/answer). Students learn at `/learn`; administrators manage content at `/admin`. Roles: `student`, `moderator`, `admin`.

## Conventions

- **User-facing text in Spanish**; code comments and identifiers in English.
- API errors have the form `{ error, code, details? }`: show `error.response.data.error` rather than hardcoding messages.
- All API calls go through `src/api/`; pages do not call axios directly.
- Match the style of the surrounding file (4-space indentation).

## Git

- git-flow: work in `feature/*` branches cut from `develop`; merge to `master` only through `release/*` or `hotfix/*`.
- **Never touch `master-legacy` or the `v-tesis` tag**: they preserve the original thesis version.
- Do not commit `.env`, `node_modules/`, `build/`, `dist/` or `coverage/`.
- Commits follow [Conventional Commits](https://www.conventionalcommits.org/): `<type>(<optional scope>): <description>`, e.g. `feat(practice): shuffle answers`, `fix(signup): show API error`, `chore(deps): upgrade react`. Types: `feat`, `fix`, `refactor`, `perf`, `test`, `docs`, `build`, `ci`, `chore`, `style`, `revert`. Breaking changes use `!` or a `BREAKING CHANGE:` footer.
- **Do not add co-authors** or attribution lines (`Co-Authored-By`, "Generated with...") to commits or PRs.

## Known pitfalls

- `src/api/requestMethods.js` reads the token once, when the module loads, so `userRequest` can use a stale token until the page reloads. Fix scheduled for phase 4.
- The `auth` flag in `localStorage` only controls what the UI shows; the API is what enforces permissions.
- `pages/LearningCapsule`, `pages/Practice` and `pages/UpdateUser` have no route: the app uses `LearningCapsuleAll` and `PracticeAll`. Removal scheduled for phase 1.
- `chart.js` is not imported directly, but `react-chartjs-2` requires it.
- Cypress specs create admins through `signup` with `roles`, which API `v3.0.0` no longer allows. See phase 4.
