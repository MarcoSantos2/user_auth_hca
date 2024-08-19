//Configuration file that initializes and manages the database connection in TypeORM

import { DataSource } from "typeorm";
import { User } from "./models/User";
import "reflect-metadata";


export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306, //default mysql port
  username: process.env.DB_USERNAME || "your_db_username",
  password: process.env.DB_PASSWORD || "your_db_password",
  database: process.env.DB_NAME || "your_db_name",
  synchronize: true,
  logging: false,
  entities: [User], // Add all your entities here
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
