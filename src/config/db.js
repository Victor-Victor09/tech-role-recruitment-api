import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import config from './env.js';


const sequelize = new Sequelize(config.databaseUrl, {
    dialect: 'postgres',
    logging: false, // Disable logging; set to console.log to see the raw SQL queries
}
);

export default sequelize;
