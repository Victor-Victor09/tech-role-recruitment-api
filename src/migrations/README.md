# Migrations

Foundation & Auth

Don't hand-write migration files here — generate them with sequelize-cli so the
filename/timestamp format is correct, then fill in the `up`/`down` functions
to match the columns in Section 5 of the plan doc:

```bash
npx sequelize-cli migration:generate --name create-users
npx sequelize-cli migration:generate --name create-applicant-profiles
npx sequelize-cli migration:generate --name create-employer-profiles
npx sequelize-cli migration:generate --name create-job-listings
npx sequelize-cli migration:generate --name create-applications
```

Run them with `npm run db:migrate`. Each migration's `up` creates one table
matching its schema table in Section 5 (Database Schema); `down` drops it.
Create them in the order above — later tables have foreign keys into earlier ones.
