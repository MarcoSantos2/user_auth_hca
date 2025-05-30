import "reflect-metadata";
import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

import userRoutes from './routes/users';
import roleRoutes from './routes/roles';
import { AppDataSource } from "./datasource";
import { getAllPermissions } from './services/permissionService'; 
import companyRoutes from './routes/company';

dotenv.config();

const app: express.Express = express();
const port = process.env.PORT || 3000;
const corsOrigins = process.env.CORS_ORIGINS || "";

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Middleware to parse JSON
app.use(express.json());

// Middleware to enable CORS
const corsOptions = {
  origin: corsOrigins.split(','),
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
console.log(corsOptions);
app.use(cors(corsOptions));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// ADD ROUTES UNDER THIS COMMENT

// User routes - map /api/users to userRoutes
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/companies', companyRoutes);

// Serve the Google Sign-In HTML file dynamically
app.get('/', (req: Request, res: Response) => {
  res.render('index', { googleClientId: process.env.GOOGLE_CLIENT_ID });
});

// Define the route for getting all permissions
app.get('/api/permissions', async (req, res) => {
  try {
    const permissions = await getAllPermissions();
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server AND initialize TypeORM
AppDataSource.initialize().then(() => {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}).catch(error => console.log("TypeORM DataSource initialization error: ", error));

export default app;
