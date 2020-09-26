const mongoose = require('mongoose')

const mapSchema = new mongoose.Schema({
    map: {
        type: Object,
        required: true
    }
})

module.exports = mongoose.model('Map', mapSchema)