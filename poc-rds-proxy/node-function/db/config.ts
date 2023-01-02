import * as dotenv from 'dotenv';
import * as pg from 'pg';
import { Dialect, Sequelize } from 'sequelize';
console.log(__dirname);
dotenv.config({ path: __dirname + '/.env' });

const dbHost = process.env.DB_HOST as string;
const dbPort = process.env.DB_PORT as string;
const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD as string;
const dbName = process.env.DB_NAME as string;
const dbDriver = 'postgres' as Dialect;

// const dbName = (process.env.DB_NAME as string) || 'poc_rds_proxy';
// const dbUser = (process.env.DB_USER as string) || 'postgres';
// const dbHost = (process.env.DB_HOST as string) || 'host.docker.internal';
// const dbPort = (process.env.DB_PORT as string) || '5432';
// const dbDriver = (process.env.DB_DRIVER || 'postgres') as Dialect;
// const dbPassword = process.env.DB_PASSWORD || '123456789';

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: +dbPort,
    dialect: dbDriver,
    dialectModule: pg,
});

export default sequelizeConnection;
