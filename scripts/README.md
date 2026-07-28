# scripts/

Owner: whoever needs it.

Schema creation and seed data are now handled by `sequelize-cli` via the
`migrations/` and `seeders/` folders (`npm run db:migrate`, `npm run db:seed`)
— not by hand-written scripts here.

Keep this folder for genuinely one-off admin scripts later if you need them
(e.g. a one-time data-fix or export script). Nothing required for MVP.
