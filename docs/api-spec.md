# API Spec

Fill this in as each route actually gets built — treat an unfilled row as "not built yet," not as documentation debt.

## Auth — ✅ Built

Both routes are rate-limited via `authRateLimiter` (10 req/15 min).

| Method | Path | Auth | Role | Description |
|---|---|---|---|---|
| POST | /api/auth/register | No | - | Create a user (applicant or employer) |
| POST | /api/auth/login | No | - | Log in, returns a JWT |

## Applicant profile — ⏳ Not built

| Method | Path | Auth | Role | Description |
|---|---|---|---|---|
| POST | /api/applicants/profile | Yes | applicant | Create the applicant profile |
| GET | /api/applicants/profile | Yes | applicant | Get your own profile |
| PATCH | /api/applicants/profile | Yes | applicant | Update your own profile |

## Employer profile — ✅ Built

All three routes, including the GET, are rate-limited via `writeActionRateLimiter` (30 req/15 min) — intentional, not a copy-paste artifact.

| Method | Path | Auth | Role | Description |
|---|---|---|---|---|
| POST | /api/employers/profile | Yes | employer | Create the employer profile |
| GET | /api/employers/profile | Yes | employer | Get your own profile |
| PATCH | /api/employers/profile | Yes | employer | Update your own profile |

## Job listings — ⏳ Not built

| Method | Path | Auth | Role | Description |
|---|---|---|---|---|
| POST | /api/jobs | Yes | employer | Create a listing |
| GET | /api/jobs | Yes | any | Search/filter listings |
| GET | /api/jobs/:id | Yes | any | Get one listing |
| PATCH | /api/jobs/:id | Yes | employer (owner) | Edit a listing |
| DELETE | /api/jobs/:id | Yes | employer (owner) | Soft-close a listing |

## Applications — ⏳ Not built

| Method | Path | Auth | Role | Description |
|---|---|---|---|---|
| POST | /api/applications | Yes | applicant | Apply to a listing |
| GET | /api/applications/:id | Yes | owner or listing's employer | View one application |
| PATCH | /api/applications/:id | Yes | applicant (owner) | Edit before it's reviewed |
| DELETE | /api/applications/:id | Yes | applicant (owner) | Cancel (soft delete) |
| GET | /api/applications/applicant/me | Yes | applicant | List your own applications |
| GET | /api/applications/employer/me | Yes | employer | List applications across your listings |
| PATCH | /api/applications/:id/status | Yes | employer | Accept/reject/move status |
