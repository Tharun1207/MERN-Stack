// Get the express module
const express = require('express');

const {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

const requireAuth = require('../middleware/requireAuth')

// Get the express router
const router = express.Router();

// Fire the requireAuth function to check whether user is logged in
// Only if so, they can get access to the workouts, and do any routing or modification to the workouts
router.use(requireAuth)

// Houses all the workout routes, adds onto the app.use part in the server.js file
// GET all workouts
router.get('/', getWorkouts)

// GET a single workout
router.get('/:id', getWorkout)

//  POST a new workout
// The create() function is an asynchronous one so need to use async and await
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)

// Export the routes
module.exports = router