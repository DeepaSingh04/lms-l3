const express = require('express');
const bodyParser = require('body-parser');
const courseRoutes = require('./routes/courseRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/courses', courseRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
