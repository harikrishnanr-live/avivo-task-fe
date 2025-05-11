/**
 * @version 1.0.0
 * @writtenBy Harikrishnan R
 * @date May 2025
 * @description This is the entry point of the backend application.
 * It sets up the Express.js server, connects to MongoDB, and configures the routes for handling user-related API requests.
 * It also integrates Swagger UI for API documentation and allows for the visualization of the available endpoints.
 * 
 * @usage
 * - Import necessary modules: Express.js, Mongoose, and Swagger UI.
 * - Configure MongoDB URI and port from environment variables.
 * - Set up the `/users` endpoint for user-related routes.
 * - Enable API documentation on the `/api-docs` endpoint.
 * - Start the server on the specified port (default 3000).
 */

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');  // Import the user routes
const { swaggerUi, swaggerSpec } = require('./swagger');  // Import Swagger UI setup

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

/**
 * This route serves the Swagger UI at `/api-docs` and allows users to view the API documentation interactively.
 * The Swagger UI fetches the Swagger specification from `swaggerSpec` to display API details.
 * 
 * @route {GET} /api-docs
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * This middleware routes any requests to `/users` to the user-related routes defined in `routes/user.js`.
 * It handles actions such as fetching the list of users, as defined in the user routes file.
 * 
 * @route {GET} /users
 */
app.use('/users', userRoutes);  // Use the user routes

// MongoDB connection setup
mongoose
  .connect(process.env.MONGO_URI)  // Connect to MongoDB using URI from environment variables
  .then(() => {
    console.log('Connected to MongoDB');  // Log success message upon connection
    // Start the Express server after successful connection to MongoDB
    app.listen(process.env.PORT || 3000, () => {
      console.log('Server is running on port', process.env.PORT || 3000);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));  // Log any errors during MongoDB connection