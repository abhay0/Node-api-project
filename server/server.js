
const express = require('express');
const bodyParser = require('body-parser');

const {ObjectId} = require('mongodb');

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

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    if(ObjectId.isValid(id)){
        ToDo.findById(id).then(
            (value) => {
            if(!value){
                res.status(400).send()
            }
            res.status(200).send({value})
        },
        (err)=> res.status(400).send(err)
    )
    }else{
        res.status(404).send()
    }
})

app.listen(3002, () => console.log(`server started at 3002 port`))

module.exports = {app}