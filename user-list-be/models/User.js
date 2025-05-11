/**
 * @version 1.0.0
 * @writtenBy Harikrishnan R
 * @date May 2025
 * @description This file defines the Mongoose schema for a `User` model. 
 * The schema describes the structure of user documents in the MongoDB database, 
 * with fields for the user's first and last names, company (name and title), and address (country).
 * 
 * @usage
 * - Import this model wherever you need to interact with the `User` collection in MongoDB.
 * - It provides an easy-to-use Mongoose model that can be used for CRUD operations.
 */

const mongoose = require('mongoose');  // Import mongoose to define the schema and model

/**
 * User Schema Definition
 * 
 * This schema defines the structure of a user document in the MongoDB database.
 * It includes fields for the user's first and last names, their company (name and title),
 * and their address (specifically the country).
 * 
 * @type {mongoose.Schema} userSchema
 * 
 * @property {String} firstName - The first name of the user.
 * @property {String} lastName - The last name of the user.
 * @property {Object} company - An object containing the user's company details.
 * @property {String} company.name - The name of the user's company.
 * @property {String} company.title - The user's title/role at the company.
 * @property {Object} address - An object containing the user's address details.
 * @property {String} address.country - The user's country.
 */

// Define the schema for the user
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,  // The data type for first name is a string
    required: true  // First name is required
  },
  lastName: {
    type: String,  // The data type for last name is a string
    required: true  // Last name is required
  },
  company: {
    name: {
      type: String,  // The company name is a string
      required: true  // Company name is required
    },
    title: {
      type: String,  // The user's company title is a string
      required: true  // Company title is required
    }
  },
  address: {
    country: {
      type: String,  // The country is a string
      required: true  // Country is required
    }
  }
});

// Export the User model based on the schema
// Mongoose automatically uses the plural of 'User' as the collection name in MongoDB
module.exports = mongoose.model('User', userSchema);