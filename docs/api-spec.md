# API Spec

Fill this in as each route actually gets built — treat an unfilled row as "not built yet," not as documentation debt.

## Auth (Person A)

| Method | Path | Auth | Role | Description |
|---|---|---|---|---|
| POST | /api/auth/register | No | - | Create a user (applicant or employer) |
| POST | /api/auth/login | No | - | Log in, returns a JWT |

## Applicant profile (Person B)

| Method | Path | Auth | Role | Description |
|---|---|---|---|---|
| POST | /api/applicants/profile | Yes | applicant | Create the applicant profile |
| GET | /api/applicants/profile | Yes | applicant | Get your own profile |
| PATCH | /api/applicants/profile | Yes | applicant | Update your own profile |

## Employer profile (Person C)

| Method | Path | Auth | Role | Description |
|---|---|---|---|---|
| POST | /api/employers/profile | Yes | employer | Create the employer profile |
| GET | /api/employers/profile | Yes | employer | Get your own profile |
| PATCH | /api/employers/profile | Yes | employer | Update your own profile |

## Job listings (Person C)

| Method | Path | Auth | Role | Description |
|---|---|---|---|---|
| POST | /api/jobs | Yes | employer | Create a listing |
| GET | /api/jobs | Yes | any | Search/filter listings |
| GET | /api/jobs/:id | Yes | any | Get one listing |
| PATCH | /api/jobs/:id | Yes | employer (owner) | Edit a listing |
| DELETE | /api/jobs/:id | Yes | employer (owner) | Soft-close a listing |

## Applications (Person B / Person C)

| Method | Path | Auth | Role | Description |
|---|---|---|---|---|
| POST | /api/applications | Yes | applicant | Apply to a listing |
| GET | /api/applications/:id | Yes | owner or listing's employer | View one application |
| PATCH | /api/applications/:id | Yes | applicant (owner) | Edit before it's reviewed |
| DELETE | /api/applications/:id | Yes | applicant (owner) | Cancel (soft delete) |
| GET | /api/applications/applicant/me | Yes | applicant | List your own applications |
| GET | /api/applications/employer/me | Yes | employer | List applications across your listings |
| PATCH | /api/applications/:id/status | Yes | employer | Accept/reject/move status |
