# Tech-Role Recruiting API

A backend REST API for a recruiting platform focused on tech roles — applicants can build a profile, upload a resume, and apply to job listings; employers can post listings and review applications. Built as a 3-person capstone project.

## Overview

This project exists to demonstrate a properly layered Node.js/Express backend: routes hand off to controllers, controllers hand off to services, and only services touch the database. Every design decision — why this folder exists, why this table has this column — is written out in `Recruiting_System_Backend_Plan.docx` (shared alongside this repo). **This README is the fast path**: what the project does, how to run it, and how to contribute. Read the plan doc when you need the reasoning behind a decision, not just the decision itself.

**Built with:**

- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) — HTTP server and routing
- [PostgreSQL](https://www.postgresql.org/) via [Sequelize](https://sequelize.org/) — database, models, migrations, seeders
- [JWT](https://jwt.io/) authentication, [bcrypt](https://www.npmjs.com/package/bcrypt) password hashing
- [multer](https://www.npmjs.com/package/multer) for resume uploads

## Install

**Prerequisites** — you'll need these installed before cloning:

- [Node.js 18 or above](https://nodejs.org/en/download/)
- [PostgreSQL](https://www.postgresql.org/download/), running locally or accessible via a connection string

Then:

```bash
git clone <repo-url>
cd tech-role-recruiting-api
npm install
cp .env.example .env
```

Open `.env` and fill in real values — at minimum `DATABASE_URL` (pointing at your Postgres instance) and `JWT_SECRET` (any long random string).

## Usage / Getting started

Once installed, create the database tables and start the server:

```bash
npm run db:migrate    # creates the 5 tables — see src/migrations/README.md
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

- **`Recruiting_System_Backend_Plan.docx`** — the full build plan: features, folder-structure rationale, database schema, Git workflow, team split, day-by-day timeline. Start here for *why*.
- **`docs/database-schema.md`** — a markdown copy of the schema tables, kept in the repo so it doesn't only live in the Word doc.
- **`docs/api-spec.md`** — endpoint reference, filled in incrementally as each route is built. Check here before assuming an endpoint doesn't exist yet.
- Every stub file under `src/` has a header comment stating who owns it, what it's responsible for, and exactly what to build — read that before writing code in a file.

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

Run the test suite as you build (see `tests/unit/` and `tests/integration/`):

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
| `npm test` | Run the test suite |

## Contributing

This is a closed, 3-person capstone team — not accepting outside contributions — but the same rules apply to all three of us:

**Team split**

| Track | Owns |
|---|---|
| Victor — Foundation & Auth | config/, constants/, utils/, middleware/, auth.* (service/controller/routes), DB schema/migrations |
| Kolade — Applicant Track | applicant.*, application.* (service/controller/routes), resume upload |
| Glory — Employer Track | employer.*, jobListing.* (service/controller/routes), application review |

See **Section 11** of the plan doc for the full micro-task breakdown and the coverage/backup plan if someone falls behind.

**Git workflow** (full version in **Section 4** of the plan doc):

- `main` is protected — all work happens on branches, merged via reviewed PRs.
- Branch naming: `type/short-description` (e.g. `feature/applicant-auth`, `fix/job-search-filter`).
- Commit messages: imperative present tense, optionally prefixed (`feat:`, `fix:`, `docs:`, `chore:`).
- Never commit `.env` or `node_modules/` — see `.gitignore`.
- Open PRs as drafts early so a stalled teammate is visible before Day 6, not Day 7.

**Reporting a bug or blocker:** raise it in the daily standup first — three people means most blockers are faster to solve by asking than by researching alone.

## Acknowledgements

- Folder-structure and build-order guidance from our tutor at TechCrush.
- Database, middleware-order, and layering rationale developed collaboratively and recorded in `Recruiting_System_Backend_Plan.docx`.

## License

Academic / internship capstone project — not currently licensed for reuse or redistribution. If this repo is later published publicly, add an [MIT License](https://opensource.org/licenses/MIT) here (the simplest permissive option) or confirm the license your program requires.

## Status

Scaffolded — folders and stub files exist with build instructions in their header comments. Nothing is implemented yet.
