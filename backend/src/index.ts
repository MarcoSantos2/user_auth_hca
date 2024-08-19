import "reflect-metadata"; 
import { DataSource } from "typeorm";
import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import userRoutes from './routes/users'; 
import { User } from './models/User';

dotenv.config();

const app: express.Express = express();
const port = process.env.PORT || 3000;

// Initialize the data source
export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || "your_db_username",
  password: process.env.DB_PASSWORD || "your_db_password",
  database: process.env.DB_NAME || "your_db_name",
  synchronize: true, // Auto-sync entities with the database schema (development only)
  logging: false,
  entities: [User], // Register your entities here
  migrations: [],
  subscribers: [],
});

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Middleware to parse JSON
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// User routes - map /api/users to userRoutes
app.use('/api/users', userRoutes);

// Serve the Google Sign-In HTML file dynamically
app.get('/', (req: Request, res: Response) => {
  res.render('index', { googleClientId: process.env.GOOGLE_CLIENT_ID });
});

// Start the server AND initialize TypeORM
AppDataSource.initialize().then(() => {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}).catch(error => console.log("TypeORM DataSource initialization error: ", error));

export default app;