# Seeders

Owner: whoever needs sample data first — usually Person A on Day 1-2.

Generate with sequelize-cli, don't hand-write the filename:

```bash
npx sequelize-cli seed:generate --name demo-users
```

Keep seed data small and realistic: a couple of applicants, a couple of
employers, a couple of job listings, one or two applications. Run with
`npm run db:seed`. Re-running should not error — either clear the tables
first or use `findOrCreate`.
