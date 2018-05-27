const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate : {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
});

//methods is an object where we define methods
UserSchema.methods.toJSON = function() {
    let user =this;
    let userObject = user.toObject();//converting mongo user to object
    return _.pick(userObject, ['_id', 'email']);
}
UserSchema.methods.generateAuthToken = function(){
    let user = this;
    let access = 'auth';
    let token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
    user.tokens = [{access, token}]
    return user.save().then(() => token);
}

const User = mongoose.model('Users', UserSchema);

module.exports = {User};