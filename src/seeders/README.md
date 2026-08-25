# Seeders

Whoever needs sample data first — usually person  on Auth foumdation — sets this file up.

Generate with sequelize-cli, don't hand-write the filename:

```bash
npx sequelize-cli seed:generate --name demo-users
```

Keep seed data small and realistic: a couple of applicants, a couple of
employers, a couple of job listings, one or two applications. Run with
`npm run db:seed`. Re-running should not error — either clear the tables
first or use `findOrCreate`.
