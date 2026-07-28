# Database Schema

Markdown copy of Section 5 in `Recruiting_System_Backend_Plan.docx` — keep the two in sync if the schema changes.

## users
One row per person, applicant or employer. Auth lives here; profile detail lives in the two tables below.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK, default uuid_generate_v4() | Required for every user |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Validate format before insert |
| password_hash | VARCHAR(255) | NOT NULL | Hash with bcrypt in the service layer |
| role | ENUM('applicant','employer') | NOT NULL | Decides which profile table this user owns |
| phone | VARCHAR(20) | NULLABLE | Validate format if present |
| created_at | TIMESTAMP | DEFAULT now() | |
| updated_at | TIMESTAMP | DEFAULT now() | Update on every PATCH/PUT |

## applicant_profiles
One-to-one with users.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK | |
| user_id | UUID | FK -> users.id, UNIQUE, NOT NULL | One profile per user |
| full_name | VARCHAR(255) | NOT NULL | |
| tech_stack | TEXT[] or VARCHAR | NULLABLE | Array/JSON or comma list |
| years_of_experience | INTEGER | NOT NULL, >= 0 | |
| linkedin_url | VARCHAR(255) | NULLABLE | |
| work_preference | ENUM('remote','hybrid','onsite') | NOT NULL | |
| resume_url | VARCHAR(255) | NULLABLE | Store the path/URL, not the file |
| created_at / updated_at | TIMESTAMP | DEFAULT now() | |

## employer_profiles
One-to-one with users.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK | |
| user_id | UUID | FK -> users.id, UNIQUE, NOT NULL | |
| company_name | VARCHAR(255) | NOT NULL | |
| company_description | TEXT | NULLABLE | |
| website | VARCHAR(255) | NULLABLE | |
| created_at / updated_at | TIMESTAMP | DEFAULT now() | |

## job_listings
Created by an employer.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK | |
| employer_id | UUID | FK -> employer_profiles.id, NOT NULL | |
| title | VARCHAR(255) | NOT NULL | |
| description | TEXT | NOT NULL | |
| tech_stack | TEXT[] or VARCHAR | NULLABLE | Used for search/filter |
| work_preference | ENUM('remote','hybrid','onsite') | NOT NULL | Used for search/filter |
| location | VARCHAR(255) | NULLABLE | |
| status | ENUM('open','closed') | DEFAULT 'open' | Closed listings reject new applications |
| created_at / updated_at | TIMESTAMP | DEFAULT now() | |

## applications
Links an applicant to a job listing. This is where the audit trail lives.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK | |
| applicant_id | UUID | FK -> applicant_profiles.id, NOT NULL | |
| job_listing_id | UUID | FK -> job_listings.id, NOT NULL | |
| status | ENUM('applied','under review','rejected','hired') | DEFAULT 'applied' | Enforce in DB AND validator |
| cover_note | TEXT | NULLABLE | |
| applied_at | TIMESTAMP | DEFAULT now() | Part of the audit trail |
| updated_at | TIMESTAMP | DEFAULT now() | Update whenever status changes |
| cancelled_at | TIMESTAMP | NULLABLE | Soft delete — set instead of deleting the row |
