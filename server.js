// Modules
const express = require('express');

// Create an app
const app = express();

// Port to run on
const port = process.env.PORT || 3000;

// Routes
app.use('/', require('./routes'));

// Listen on port
app.listen(port, () => {
    console.log(`Running on ${port}`);
});