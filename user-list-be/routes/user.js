/**
 * @version 1.0.0
 * @writtenBy Harikrishnan R
 * @date May 2025
 * @description This file defines the route handlers for the `/users` endpoint.
 * It uses Express.js to handle HTTP requests, fetching the list of users from 
 * the MongoDB database via the `User` model. The routes are defined with Swagger 
 * documentation for better API visibility.
 * 
 * @usage
 * - Import this file into the main app (e.g., `server.js`) to set up routes.
 * - It provides a GET route to fetch all users from the database.
 * - Swagger is used to document the API endpoint for better understanding.
 */

const express = require('express');
const router = express.Router();  // Initialize the router

const User = require('../models/User');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   company:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       title:
 *                         type: string
 *                   address:
 *                     type: object
 *                     properties:
 *                       country:
 *                         type: string
 */

// GET route to fetch users
/**
 * This route handles GET requests to the `/users` endpoint.
 * It queries the MongoDB database using the `User` model and returns a list of users.
 * If an error occurs during the database query, a 500 status code with an error message is returned.
 * 
 * @async
 * @function GET /
 * @returns {object} A JSON array of user objects, each containing user details such as name, company, and country.
 * @throws {Error} Will throw an error and respond with a 500 status code if the database query fails.
 */
router.get('/', async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();
    // Send the list of users as a JSON response
    res.json(users);
  } catch (err) {
    // If there is an error, send a 500 status code with an error message
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Export the router
module.exports = router;