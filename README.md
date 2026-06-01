# Networking CRM

A simple networking relationship management tool built as part of a junior developer job search.

The goal is to track:

- Networking contacts
- LinkedIn connections
- Networking events
- Coffee chats and intro calls
- Follow-up actions

This project is also being used as an Agentic SDLC experiment to explore how autonomous coding agents can safely contribute within a structured software development process.

## MVP 1 Scope

- Add contacts
- View contacts
- Add networking events
- View networking events
- Log interactions
- Record planned calls
- Record completed calls
- Create follow-up actions
- Mark follow-ups complete
- View relationship history
- View upcoming actions

## Tech Stack

### Frontend

- React
- TypeScript
- Vite

### Backend

- Node.js
- Express
- TypeScript

### Database

- SQLite
- Knex

## Project Status

Currently in early development.

The project is following an Agentic SDLC workflow:

Idea → Proposal → Architecture → Tasks → Implementation → Review → Continuous Improvement

## Setup

Install dependencies from the repository root:

```bash
npm install
```

Run the client:

```bash
npm run dev:client
```

Run the server:

```bash
npm run dev:server
```

The server listens on port `3000` by default.

Health check:

```bash
curl http://localhost:3000/health
```

Expected response:

```json
{
  "status": "ok"
}
```

## Development Checks

Run tests:

```bash
npm run test
```

Run tests with coverage:

```bash
npm run test:coverage
```

Run TypeScript checks:

```bash
npm run typecheck
```

Build all workspaces:

```bash
npm run build
```

## Database

Run the latest migrations:

```bash
npm run db:migrate
```

Check migration status:

```bash
npm run db:status
```

Roll back the latest migration batch:

```bash
npm run db:rollback
```

The local SQLite database is created at `server/data/networking-crm.sqlite3`.
