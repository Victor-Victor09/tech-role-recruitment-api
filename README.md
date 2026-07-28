# Tech-Role Recruiting API

A backend RESTful API scaffold for a recruiting platform focused on tech roles — applicants can build a profile, upload a resume, and apply to job listings; employers can post listings and review applications. This repo currently contains the project skeleton and starter files; core business logic and route handling remain under development.

## Overview

This project is structured to demonstrate a properly layered Node.js/Express backend: routes hand off to controllers, controllers hand off to services, and only services touch the database. The current repository is scaffolded and many `src/` files still contain TODO comments.

## Structural design notes

- `src/app.js` should build the Express app and mount middleware and routes, but not call `app.listen()`.
- `server.js` is the single entry point responsible only for starting the HTTP server.
- `src/routes/index.js` should centralize route registration under `/api`, with child route modules for auth, applicants, employers, job listings, and applications.
- Controllers should be thin and only transform request data and send responses; they should delegate business logic to services.
- Services are the only layer allowed to interact with Sequelize models in `src/models/` and should handle data operations, validation, and domain rules.
- Middleware lives in `src/middleware/` and should include authentication, authorization/role checks, validation, file upload handling, and centralized error handling.
- Configuration should be read once in `src/config/env.js`, then consumed by `src/config/db.js` and other modules rather than accessing `process.env` directly throughout the app.

**Built with (intended tech stack):**

- Node.js + Express — HTTP server and routing.
- PostgreSQL via Sequelize — database, models, migrations, seeders.
- JWT authentication, bcrypt — password hashing.
- multer package for resume uploads.

## Install

**Prerequisites** — you'll need these installed before cloning:

- Node.js 18 or above
- PostgreSQL

Then:

```bash
git clone <repo-url>
cd tech-role-recruiting-api
npm install
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Open `.env` and fill in real values. The repository includes `.env.example`; at minimum populate `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, and `NODE_ENV`.

## Usage / Getting started

Once installed, create the database tables and start the server:

```bash
npm run db:migrate    # creates database tables via sequelize-cli
npm run db:seed       # optional — sample applicants/employers/listings for local testing
npm run dev           # starts the server on PORT (default 5000), auto-restarts on file changes
```

With the server running, register a user and log in to get a JWT:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"changeme123","role":"applicant"}'
```

Use the returned token as a `Bearer` token in the `Authorization` header for any protected route.

## Documentation

- `docs/database-schema.md` — markdown copy of the database schema.
- `docs/api-spec.md` — endpoint reference.
- `.env.example` — sample environment configuration.
- Note: `Recruiting_System_Backend_Plan.docx` is referenced in code comments, but it is not included in this repository.
- Every stub file under `src/` has a header comment stating who owns it, what it is responsible for, and what to build — read that before writing code in a file.

## Current implementation notes

- `server.js` contains startup logic, but `src/app.js` is still a scaffold and does not mount real routes or middleware.
- `src/config/env.js` is not implemented.
- `src/config/db.js` is partially configured and currently expects `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, and `DB_DIALECT`, while `.env.example` uses `DATABASE_URL`. These should be aligned during implementation.
- Most `src/controllers/`, `src/services/`, `src/routes/`, `src/models/`, and `src/middleware/` files still contain TODO comments.

### Project structure

```
src/
  config/       # env, Sequelize instance, config.json for sequelize-cli
  constants/    # roles, application statuses, job types — single source of truth
  models/       # Sequelize model definitions + associations, one file per table
  migrations/   # sequelize-cli migrations — generate, don't hand-write
  seeders/      # sequelize-cli seeders — generate, don't hand-write
  services/     # business logic — the only layer that talks to models
  controllers/  # thin request-in/response-out layer
  middleware/   # auth, role, validate, upload, error handling
  routes/       # URL + verb -> middleware chain -> controller
  utils/        # AppError, catchAsync, response shape, hash, token, logger
  validators/   # field-level validation rules, one file per resource
  app.js        # builds the Express app — no app.listen()
server.js       # the only file that calls app.listen()
scripts/        # optional one-off admin scripts (not migrations/seeding — see scripts/README.md)
tests/          # unit/ (services) and integration/ (routes)
docs/           # api-spec.md, database-schema.md
```

## Development

Run the existing test stub:

```bash
npm test
```

Rolling back a migration during local development:

```bash
npm run db:migrate:undo
```

| Command | What it does |
|---|---|
| `npm run dev` | Start the server with nodemon (auto-restart) |
| `npm start` | Start the server normally |
| `npm run db:migrate` | Create the database tables (sequelize-cli) |
| `npm run db:migrate:undo` | Roll back the last migration |
| `npm run db:seed` | Insert sample data (sequelize-cli) |
| `npm test` | Run the test stub |

## Contributing

This is a closed, 3-person capstone team — not accepting outside contributions — but the same rules apply to all three of us:

**Team split**

| Track | Owns |
|---|---|
| Victor — Foundation & Auth | config/, constants/, utils/, middleware/, auth.* (service/controller/routes), DB schema/migrations |
| Kolade — Applicant Track | applicant.*, application.* (service/controller/routes), resume upload |
| Glory — Employer Track | employer.*, jobListing.* (service/controller/routes), application review |

**Git workflow**:

- `main` is protected — all work happens on branches, merged via reviewed PRs.
- Branch naming: `type/short-description` (e.g. `feature/applicant-auth`, `fix/job-search-filter`).
- Commit messages: imperative present tense, optionally prefixed (`feat:`, `fix:`, `docs:`, `chore:`).
- Never commit `.env` or `node_modules/` — see `.gitignore`.
- Open PRs as drafts early so a stalled teammate is visible before Day 6, not Day 7.

**Reporting a bug or blocker:** raise it in the daily standup first — three people means most blockers are faster to solve by asking than by researching alone.

## Acknowledgements

- Database, middleware-order, and layering rationale developed collaboratively.

## License

Internship capstone project — not currently licensed for reuse or redistribution.

## Status

Scaffolded — folders and stub files exist with build instructions in their header comments. Core application logic and route wiring are not yet implemented.

## Next steps

- Implement `src/app.js`, mount `src/routes/index.js`, and register the middleware pipeline.
- Complete `src/config/env.js` and align environment variables between `.env.example` and Sequelize config.
- Wire the route/controller/service flow for auth, applicants, employers, job listings, and applications.
- Add real tests under `tests/unit/` and `tests/integration/`, then replace the current `npm test` stub.
