import app from './src/app.js';
import { env } from './src/config/env.js';
import { connectDB } from './src/config/db.js';
import logger from './src/utils/logger.js';

// Handle Uncaught Exceptions
process.on('uncaughtException', (err) => {
  logger.error(`UNCAUGHT EXCEPTION: ${err.name} - ${err.message}`);
  process.exit(1);
});

let server;

const startServer = async () => {
  await connectDB(); // Connect to MongoDB Atlas
  
  server = app.listen(env.port, () => {
    logger.success(`GTP API Server running in ${env.env} mode on port ${env.port}`);
  });
};

startServer();

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
  logger.error(`UNHANDLED REJECTION: ${err.name} - ${err.message}`);
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});
