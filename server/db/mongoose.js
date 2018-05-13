const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const url = "mongodb://localhost:27017/ToDoApp";
mongoose.connect(url);

module.exports = {
    mongoose
}