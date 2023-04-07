const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true,
        default: Date.now
    }

})


module.exports = mongoose.model('movie',movieSchema)