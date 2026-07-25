# HireFlow

HireFlow is a polished job-discovery and application-tracking experience. It helps a candidate find relevant roles, build a shortlist, and keep their application pipeline moving from one simple workspace.

## Product rationale

Job searching tends to fragment across many tabs, boards, and notes. HireFlow brings the high-frequency actions into one calm flow:

- discover and filter curated roles;
- save promising opportunities for later;
- add a role to an application board and update its status.

The project deliberately uses local browser storage for saves and applications: it makes the prototype immediately usable without requiring an account or backend, while keeping a clear seam for a future API.

## Stack

- React 19 + Vite
- Plain CSS for a lightweight, responsive interface
- Browser `localStorage` for prototype persistence
- ESLint for static checks
- GitHub Actions for continuous integration and deployment
- Vercel for hosting

## Run locally

Prerequisite: [Bun](https://bun.sh) 1.0 or newer.

```bash
bun install
bun run dev
```

Open the local URL displayed by Vite. For a production verification:

```bash
bun run lint
bun run build
bun run preview
```

## CI/CD

Two workflows are intentionally separated:

| Workflow | Trigger | Responsibility |
| --- | --- | --- |
| `Quality checks` | Pull requests and pushes to `main` | Install locked dependencies, lint, and create a production build |
| `Deploy to Vercel` | Pushes to `main` | Deploy the `main` branch to Vercel production |

### One-time Vercel setup

1. Create a Vercel project by importing this GitHub repository (or run `vercel link` locally).
2. In the GitHub repository’s **Settings → Secrets and variables → Actions**, add:
   - `VERCEL_TOKEN` — a Vercel personal access token;
   - `VERCEL_ORG_ID` — Vercel team/user ID;
   - `VERCEL_PROJECT_ID` — the project ID.
3. Push to `main`. Vercel's connected Git integration deploys to production immediately. Once the three secrets are present, the explicit GitHub Actions deployment job also validates and deploys the production build.

Until those secrets are configured, the deployment job is intentionally skipped rather than failing. This keeps the CI signal green while Vercel's native Git deployment remains active.

Vercel also supports its native Git integration. It should be disabled for this project if the GitHub Action is the desired single deployment path, avoiding duplicate deployments.

## Architecture notes

The UI is componentized around `JobCard`, `JobModal`, and `Applications`. Seed data is isolated in `src/data.js`; replacing it with an API client would not require reworking the screen components. Application and save actions are persisted independently, allowing the two features to evolve separately.

## Future improvements

- Add authentication and a server-side data model.
- Replace seed roles with a paginated search API.
- Add due dates, notes, and reminders to applications.
- Add component and end-to-end tests.

## AI usage

AI was used as an implementation partner to accelerate initial UI composition, generate the CI/CD scaffolding, and improve this documentation. The final scope, product decisions, code review, and validation were directed by the developer.
