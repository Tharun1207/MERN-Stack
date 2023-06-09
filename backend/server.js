require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

// Creating an Express app
const app = express();

// Middleware function that runs for every and any req FIRST
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// Routes
// Grabs the routes attached to the workout router
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// Connect to DB 
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB & listening on port', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error)
    })


