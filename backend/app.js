const express = require('express');
const ruleRoutes = require('./routes/ruleRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

// Use the routes
app.use('/api/rules', ruleRoutes);

module.exports = app;
