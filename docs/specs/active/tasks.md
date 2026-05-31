# Tasks: Networking CRM

## Phase 0: Project Setup

### TASK-001: Scaffold initial full-stack codebase

Role: Implementation Agent

Goal:
Create the initial full-stack project structure using TypeScript, React, Node/Express, SQLite, and Knex.

Allowed files/folders:

- package.json files
- client/
- server/
- README.md
- config files required for TypeScript/Vite/Express/Knex

Forbidden:

- database migrations
- CRM API routes
- CRM UI screens
- auth
- Supabase
- OAuth
- external APIs
- styling libraries
- deployment configuration

Acceptance criteria:

- [ ] Client app can run.
- [ ] Server app can run.
- [ ] Server exposes a basic health route.
- [ ] TypeScript is configured.
- [ ] Knex/SQLite is prepared but no migrations are created.
- [ ] Setup instructions are documented.

Tests/checks:

- Run install successfully.
- Run client dev script.
- Run server dev script.
- Manually check health endpoint.

Stopping point:
Stop after scaffold only.
