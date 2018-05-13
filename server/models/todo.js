const mongoose = require('mongoose');

const ToDo = mongoose.model('ToDo', {
    text: {
        type: String,
        require: true,
        trim: true,
        minlength: 1
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {ToDo};