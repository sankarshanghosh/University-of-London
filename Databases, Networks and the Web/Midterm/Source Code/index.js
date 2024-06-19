const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Set up body parser for form data
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up SQLite
const sqlite3 = require('sqlite3').verbose();
global.db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Database connection error: ' + err.message);
        process.exit(1);
    } else {
        console.log("Database connected");
        global.db.run("PRAGMA foreign_keys=ON");
    }
});

// Define fetchBlogSettings middleware
function fetchBlogSettings(req, res, next) {
    const query = "SELECT * FROM BlogSettings ORDER BY setting_id DESC LIMIT 1";
    global.db.get(query, (err, settings) => {
        if (err) {
            console.error("Failed to fetch blog settings:", err);
            next(err);  // Continue without settings
        } else {
            res.locals.settings = settings;
            next();
        }
    });
}

app.use(fetchBlogSettings);

// Routes setup
const routes = require('./routes/routes');
app.use('/', routes);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
