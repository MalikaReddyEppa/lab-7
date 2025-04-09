const express = require('express');
const logger = require('morgan');
const path = require('path');
const app = express();
const PORT = 8081; // Use 8080 as requested

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev')); // Logging requests

// Serve general static files from 'public'
app.use(express.static(path.join(__dirname)));

// Serve lab-4 and lab-7 explicitly
app.use('/ITC505/lab-4', express.static(path.join(__dirname,  'ITC505', 'lab-4')));
app.use('/ITC505/lab-7', express.static(path.join(__dirname,  'ITC505', 'lab-7')));

// Redirect root path to lab-7 as default, if needed
app.get('/', (req, res) => {
    res.redirect('/itc505/lab-7');
});

// Handle form submission for a mad lib story
app.post('/create-story', (req, res) => {
    const { noun1, adj1, verb1, adverb, noun2, verb2 } = req.body;

    // Validate input
    if (!noun1 || !adj1 || !verb1 || !adverb || !noun2 || !verb2) {
        return res.status(400).send(`
            <h1>Submission Failed</h1>
            <p>Please fill out ALL fields</p>
            <a href="/itc505/lab-7">Go Back to Form</a>
        `);
    }

    // Generate story
    const story = `
        The ${adj1} ${noun1} ${verb1} ${adverb} through the city. 
        Suddenly, it encountered a group of ${noun2} blocking its way. 
        Without hesitation, the ${noun1} decided to ${verb2} around the obstacle. 
        From that moment on, it was clear that the ${noun1} had learned to face challenges head-on, 
        knowing that it could overcome anything in its path.
    `;

    // Return story
    res.send(`
        <h1>Your Mad Lib Story</h1>
        <p>${story}</p>
        <a href="/itc505/lab-7">Try Again</a>
    `);
});

// Random number route
app.get('/do_a_random', (req, res) => {
    res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
