const mongoose = require('mongoose')

const decryptSchema = new mongoose.Schema({
    decrypted: {
        type: String,
        required: true
    },
    desired_location: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Decrypt', decryptSchema)