
const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {ToDo} = require('./models/todo');
const {User} = require('./models/users');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let newTodo = new ToDo({
        text: req.body.text
    });

    newTodo.save().then(
        (doc) => res.status(200).send(doc),
        (err) => res.status(400).send(err)
    )
})

app.get('/todos', (req, res) => {
    ToDo.find().then(
        (todos) => res.status(200).send({todos}),
        (err)=> res.status(400).send(err)
    )
})

app.listen(4000, () => console.log(`server started at 4000 port`))

module.exports = {app}