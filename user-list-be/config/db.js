/**
 * @version 1.0.0
 * @writtenBy Harikrishnan R
 * @date May 2025
 * @description This file contains a function `connectDB` to establish a connection to MongoDB 
 * using Mongoose. The connection URI is retrieved from environment variables and used to 
 * connect. If successful, a log message is displayed. In case of an error, the process 
 * exits with a non-zero status.
 * 
 * The `connectDB` function should be invoked in your main app file to initiate the 
 * connection when the app starts.
 * 
 * @usage
 * 1. Ensure you have the `MONGO_URI` variable set in your `.env` file.
 * 2. Import and call `connectDB()` in the main application file to establish the database connection.
 */

const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables from a .env file

/**
 * connectDB function
 * 
 * Establishes a connection to MongoDB using Mongoose. It retrieves the MongoDB URI from
 * the environment variables and attempts to connect. If the connection is successful,
 * it logs a success message. If it fails, it logs the error and exits the process with a
 * non-zero status code.
 * 
 * @async
 * @function connectDB
 * @returns {Promise<void>} Resolves once the database connection is established.
 * @throws {Error} Will throw an error if the connection fails.
 * 
 * Usage:
 * const connectDB = require('./path-to-db');
 * connectDB();  // Call this function in the main app to establish the database connection.
 */

const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB server using the URI stored in the environment variables
    await mongoose.connect(process.env.MONGO_URI);

    // If connection is successful, log this message
    console.log('MongoDB connected');
  } catch (error) {
    // If the connection fails, log the error message and terminate the process
    console.error('MongoDB connection error:', error.message);
    process.exit(1);  // Exit the process with an error code
  }
};

module.exports = connectDB;  // Export the function so it can be used in other files