const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Creating a workout schema: defines the structure of the model itself
// First argument describes how the schema looks
// Second one adds a timestamp to the schema
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

// Model based on the schema, pluralises the first argument automatically to create a new collection
//  based on that pluralised name
module.exports = mongoose.model('Workout', workoutSchema)

