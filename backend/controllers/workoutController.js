const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// Get all workouts
const getWorkouts = async (req, res) => {
    const user_id = req.user._id

    // Finding the workouts based on user ID ,so that only those are loaded for respective users
    // Leave the argument in find() (the curly braces) blank to get all the objects
    const workouts = await Workout.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(workouts)
}

// Get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

// Create a new workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    // Find the empty fields
    let emptyFields = []

    // Checks whether fields are empty. If so, then add the fields into the emptyFields array
    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }

    // 
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    // Using the Workout model to create a new document then adding the document to DB
    try {
        // Making it such that each workout has a userID property
        // The middleware function 'requireAuth' sends a user object, which is part of 'req' object now
        // Hence, we can grab the ID of the user and add it to each workout as shown below
        const user_id = req.user._id
        const workout = await Workout.create({title, load, reps, user_id})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    // Deleting a workout
    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

// Update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    // Updating workout
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        // Spreading the properties of the object
        ...req.body
    })

    if (!workout) {
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}