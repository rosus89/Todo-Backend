const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model("Todo", todoSchema)