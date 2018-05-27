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

//for handling the output from api's
UserSchema.methods.toJSON = function() {
    let user =this;
    let userObject = user.toObject();//converting mongo user to object
    return _.pick(userObject, ['_id', 'email']);
}

//for generating auth tokens. It is a instance method not model method
UserSchema.methods.generateAuthToken = function(){
    let user = this;
    let access = 'auth';
    let token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
    user.tokens = [{access, token}]
    return user.save().then(() => token);
}

//creating model method
UserSchema.statics.getUserByToken = function(token) {
    let User = this;
    let decode;
    try {
        decode = jwt.verify(token, 'abc123')
    } catch (error) {
        return Promise.reject()
    }

    return User.findOne({
        '_id': decode._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
}

const User = mongoose.model('Users', UserSchema);

module.exports = {User};