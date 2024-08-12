import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import userRoutes from './routes/users'; // Importing user routes

dotenv.config();

const app: express.Express = express();
const port = process.env.PORT || 3000;

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

// Start the server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;