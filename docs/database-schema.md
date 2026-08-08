# Database Schema

Reflects the actual applied migrations in `src/migrations/` (not the original plan doc — see note on drift below). Keep this in sync whenever a migration changes.

## users
One row per person, applicant or employer. Auth lives here; profile detail lives in the two tables below.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK, default UUIDV4 | |
| email | STRING | UNIQUE, NOT NULL | Validate format before insert |
| passwordHash | STRING | NOT NULL | Hash with bcrypt in the service layer |
| role | ENUM('applicant','employer') | NOT NULL | Decides which profile table this user owns |
| phone | STRING | NULLABLE | Validate format if present |
| createdAt / updatedAt | DATE | NOT NULL, default NOW | |

## applicantProfiles
One-to-one with `users`.

⚠️ **Known drift from the original plan doc** — applied here, not yet reconciled:

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK | |
| userId | UUID | FK → users.id, UNIQUE, NOT NULL, CASCADE | One profile per user |
| firstName | STRING | NOT NULL | Plan doc had a single `full_name` |
| lastName | STRING | NOT NULL | Plan doc had a single `full_name` |
| techstack | ARRAY(STRING) | NULLABLE | Lowercase `techstack`, breaks camelCase convention — intentional for now |
| yearOfExperience | INTEGER | NOT NULL, default 0 | Plan doc had `yearsOfExperience` (plural) |
| linkedinURL | STRING | NULLABLE | Plan doc had `linkedinUrl` |
| githubURL | STRING | NULLABLE | Not in original plan doc — added |
| resume | STRING | NULLABLE | Stores path/URL, not the file. Plan doc had `resume_url` |
| createdAt / updatedAt | DATE | NOT NULL, default NOW | |

*(work_preference from the original plan is not present in this migration — confirm with Kolade whether it's intentionally deferred or missing.)*

## employerProfiles
One-to-one with `users`.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK | |
| userId | UUID | FK → users.id, UNIQUE, NOT NULL, CASCADE | |
| companyName | STRING | NOT NULL | |
| companyDescription | TEXT | NULLABLE | |
| companyWebsite | STRING | NULLABLE | Plan doc had `website` |
| createdAt / updatedAt | DATE | NOT NULL, default NOW | |

## jobListings
Created by an employer.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK | |
| employerId | UUID | FK → employerProfiles.id, NOT NULL, CASCADE | |
| title | STRING | NOT NULL | |
| description | TEXT | NOT NULL | |
| techRole | STRING | NOT NULL | Not in the original plan doc |
| ~~techStack~~ | ARRAY(STRING) | — | **Commented out in the migration** — not currently a real column, despite being in the plan doc for search/filter |
| workPreference | ENUM('remote','on-site','hybrid') | NOT NULL | Plan doc used `'onsite'` (no hyphen) — this migration uses `'on-site'`; keep validators consistent with the DB enum |
| location | STRING | NULLABLE | |
| status | ENUM('open','closed') | NOT NULL, default 'open' | Closed listings reject new applications |
| createdAt / updatedAt | DATE | NOT NULL, default NOW | |

## applications
Links an applicant to a job listing. This is where the audit trail lives.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK | |
| applicantId | UUID | FK → applicantProfiles.id, NOT NULL, CASCADE | |
| jobListingId | UUID | FK → jobListings.id, NOT NULL, CASCADE | |
| status | ENUM('applied','under review','hired','rejected') | NOT NULL, default 'applied' | Enforce in DB AND validator |
| coverNote | TEXT | NULLABLE | |
| appliedAt | DATE | NOT NULL, default NOW | Part of the audit trail |
| updatedAt | DATE | NOT NULL, default NOW | Update whenever status changes |
| cancelledAt | DATE | NULLABLE | Soft delete — set instead of deleting the row |
