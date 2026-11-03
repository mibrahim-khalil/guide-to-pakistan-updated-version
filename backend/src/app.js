import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import routes from './routes/index.js';

const app = express();

// Global Middlewares
app.use(helmet());

// FIX: Allow all local development origins so you don't get "Failed to Fetch"
app.use(cors({
  origin: env.env === 'development' ? '*' : env.corsOrigin,
  credentials: true,
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

if (env.env === 'development') {
  app.use(morgan('dev'));
}

// API Routes
app.use('/api/v1', routes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;