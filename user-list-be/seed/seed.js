/**
 * @file seed.js
 * @description Script to seed the MongoDB database with initial user data.
 * @author Harikrishnan
 * @version 1.0.0
 * @date 2025-05-11
 */

const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

/**
 * Async function to connect to MongoDB, clear existing users,
 * and insert a predefined list of users.
 */
const run = async () => {
  try {
    // Connect to MongoDB using URI from .env
    await mongoose.connect(process.env.MONGO_URI);

    // Remove all existing documents in the users collection
    await User.deleteMany();

    // Insert initial mock user data
    await User.insertMany([
      {
        firstName: 'John',
        lastName: 'Doe',
        company: { name: 'Acme Corp', title: 'Engineer' },
        address: { country: 'USA' }
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        company: { name: 'Globex', title: 'Manager' },
        address: { country: 'Canada' }
      }
    ]);

    console.log('✅ Seeded users');
  } catch (error) {
    console.error('❌ Error seeding users:', error);
  } finally {
    // Exit the process after seeding
    process.exit();
  }
};

run();