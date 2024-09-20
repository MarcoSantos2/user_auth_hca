//Configuration file that initializes and manages the database connection in TypeORM

import dotenv from 'dotenv';
import "reflect-metadata";
import { DataSource, LogLevel } from "typeorm";
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

dotenv.config();

const logging = (process.env.LOGGING || '').split(',');


export const dataSourceOptions: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOSTNAME || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "health_care_aide",
  synchronize: false,
  logging: logging as LogLevel[],
  entities: ["src/models/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"]
}

export const AppDataSource = new DataSource(dataSourceOptions);
