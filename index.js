/**
 * @fileoverview A minimal Express.js server entry point for Genezio.
 * This file would be the compiled output from your TypeScript source.
 */

// Import the Express framework
const express = require('express');

// Create the Express application instance
const app = express();

// A basic route for testing the server
// Genezio will serve your frontend and route API requests here
app.get('/', (req, res) => {
  // Send a simple text response
  res.send('Backend is running!');
});

// The crucial part: export the app as a handler.
// The name `handler` is what you specified in your genezio.yaml file.
exports.handler = app;