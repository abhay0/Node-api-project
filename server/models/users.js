const mongoose = require('mongoose');

const User = mongoose.model('Users', {
    email: {
        type: String,
        require: true,
        trim: true,
        minlength: 1
    }
});

module.exports = {User};