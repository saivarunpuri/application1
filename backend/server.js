// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const ruleRoutes = require('./routes/ruleRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/api/rules', ruleRoutes); // Use the rule routes

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
