import app from './src/app.js';
import sequelize from './src/config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;


async function startServer() {
    try {
        // 1. Authenticate with PostgreSQL
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        
        // 2. Sync models with the database
        // await sequelize.sync({ alter: true }); // Use { force: true } for development to drop and recreate tables
        // console.log('Database tables verifiedsynchronized successfully.');
        console.log('Skipping sync — schema is managed via migrations (npm run db:migrate).');
        
        app.listen(PORT, () => {
            console.log(`Server is running live on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
        process.exit(1); // Exit the process with an error code
    }
}

startServer();