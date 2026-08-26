# Tech-Role Recruiting API

A backend RESTful API for a recruiting platform focused on tech roles. Applicants build a profile, upload a resume, and apply to job listings. Employers post listings and review applications.

## Overview

The project is a layered Node.js/Express backend: routes hand off to controllers, controllers hand off to services, and only services touch the database. All five resource tracks (auth, applicants, employers, job listings, applications) are implemented and mounted under `/api`.

## Structural design notes

- `src/app.js` builds the Express app and mounts middleware and routes. It doesn't call `app.listen()`.
- `server.js` is the single entry point responsible only for starting the HTTP server.
- `src/routes/index.js` centralizes route registration under `/api`, with child route modules for auth, applicants, employers, job listings, and applications.
- Controllers are thin. They transform request data and send responses, and delegate business logic to services.
- Services are the only layer allowed to interact with Sequelize models in `src/models/`. They handle data operations, validation, and domain rules.
- Middleware lives in `src/middleware/`: authentication, authorization/role checks, request validation, file upload handling, rate limiting, and centralized error handling.
- Configuration is read once in `src/config/env.js`, then consumed by `src/config/db.js` and other modules rather than accessing `process.env` directly throughout the app.

**Built with:**

- Node.js + Express for the HTTP server and routing.
- PostgreSQL via Sequelize for the database, models, migrations, and seeders.
- JWT authentication and bcrypt for password hashing.
- multer for resume uploads.
- express-rate-limit for request throttling on auth and write-heavy routes.

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

Open `.env` and fill in real values. At minimum populate `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, and `NODE_ENV`.

## Usage / Getting started

```bash
npm run db:migrate    # creates database tables via sequelize-cli
npm run db:seed       # sample applicants, employers, and job listings for local testing
npm run dev           # starts the server on PORT (default 5000), auto-restarts on file changes
```

`npm run db:seed` inserts three applicants, three employers, three job listings, and one sample application, each with a real resume PDF copied into `uploads/resumes/`. It's safe to run more than once; every insert checks for an existing row first, so it won't duplicate data or pile up extra files on disk.

Register a user and log in to get a JWT:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"changeme123","role":"applicant"}'
```

Use the returned token as a `Bearer` token in the `Authorization` header for any protected route.

## Documentation

- `docs/database-schema.md` — the actual applied schema, including where it drifted from the original plan doc.
- `docs/api-spec.md` — full endpoint reference.
- `.env.example` — sample environment configuration.
- `Recruiting_System_Backend_Plan.docx` is referenced in code comments but isn't included in this repository.

## Implementation notes

- `src/app.js` builds the Express app, mounts CORS/JSON middleware, the error middleware, and `/api` routes.
- `src/config/env.js` reads and validates `DATABASE_URL` and `JWT_SECRET` at startup, and fails fast if either is missing.
- All five resource tracks, auth, applicant, employer, job listing, and application, are implemented and mounted in `src/routes/index.js`.
- Rate limiting is applied throughout: `authRateLimiter` on the two auth routes, `writeActionRateLimiter` on writes and on a handful of reads where it was applied deliberately for consistency or to slow down ID enumeration. See `docs/api-spec.md` for exactly which routes and why.
- Ownership checks on applicant and application resources return 404 rather than 403 for non-owned resources, to avoid leaking whether a resource exists.
- All five migrations (`users`, `applicantProfiles`, `employerProfiles`, `jobListings`, `applications`) are written and applied. See `docs/database-schema.md` for the applied schema, which drifted in a few places from the original plan doc.
- `jobListings` never got a separate `techStack` array column. The plan doc's field was replaced by `techRole`, a single string, and search/filter runs against that instead.
- `applicantProfiles.techstack` is a real, active field (an array of skills, distinct from `jobListings.techRole`), currently lowercase rather than camelCase. That naming drift is intentional and deferred, not an oversight.

### Project structure

```text
src/
  config/       # env, Sequelize instance, config.json for sequelize-cli
  constants/    # roles, application statuses, job types — single source of truth
  models/       # Sequelize model definitions + associations, one file per table
  migrations/   # sequelize-cli migrations — generate, don't hand-write
  seeders/      # sequelize-cli seeders, plus fixtures/ for the sample resume PDFs
  services/     # business logic — the only layer that talks to models
  controllers/  # thin request-in/response-out layer
  middleware/   # auth, role, validate, upload, rate limiting, error handling
  routes/       # URL + verb -> middleware chain -> controller
  utils/        # ApiError, catchAsync, response shape, hash, token, logger
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

Rolling back seed data specifically (not the same command, and not interchangeable, `db:migrate:undo` rolls back a table migration, not seeded rows):

```bash
npx sequelize-cli db:seed:undo:all
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the server with nodemon (auto-restart) |
| `npm start` | Start the server normally |
| `npm run db:migrate` | Create the database tables (sequelize-cli) |
| `npm run db:migrate:undo` | Roll back the last migration |
| `npm run db:seed` | Insert sample data (sequelize-cli) |
| `npx sequelize-cli db:seed:undo:all` | Remove seeded data and its resume files |
| `npm test` | Run the test stub |

## Contributing

This was a closed, three-person capstone team, not open to outside contributions, but the same rules applied to all three of us throughout the build.

### Team split

| Track | Owns |
| --- | --- |
| Victor — Foundation & Auth | config/, constants/, utils/, middleware/, auth.* (service/controller/routes), DB schema/migrations |
| Kolade — Applicant Track | applicant.*, application.* (service/controller/routes), resume upload |
| Glory — Employer Track | employer.*, jobListing.* (service/controller/routes), application review |

**Git workflow:**

- `main` was protected. All work happened on branches, merged via reviewed PRs.
- Branch naming: `type/short-description` (e.g. `feature/applicant-auth`, `fix/job-search-filter`).
- Commit messages: imperative present tense, optionally prefixed (`feat:`, `fix:`, `docs:`, `chore:`).
- `.env`, `node_modules/`, and `uploads/` were never committed. See `.gitignore`.

## Acknowledgements

- Database, middleware-order, and layering rationale developed collaboratively.

## License

Internship capstone project. Not currently licensed for reuse or redistribution.

## Status

Complete. All five tracks (auth, applicant, employer, job listing, application) are implemented, mounted, and reviewed. GitHub Advanced Security's rate-limiting findings were addressed across the affected routes, and a job listings migration typo (`down()` dropping the wrong table name) was fixed.

## Possible follow-ups

- Add real tests under `tests/unit/` and `tests/integration/`, then retire the current `npm test` stub. This is the one deliberately deferred item; everything else in this list is optional polish.
