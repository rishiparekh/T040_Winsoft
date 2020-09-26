const mongoose = require('mongoose')

const mapSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    map: {
        type: Object,
        required: true
    }
})

module.exports = mongoose.model('Map', mapSchema)