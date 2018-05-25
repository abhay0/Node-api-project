
const express = require('express');
const bodyParser = require('body-parser');

const {ObjectId} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {ToDo} = require('./models/todo');
const {User} = require('./models/users');

const port = process.env.PORT || 3002;

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
                return res.status(400).send()
            }
            res.status(200).send({value})
        },
        (err)=> res.status(400).send(err)
    ).catch((e) => console.log(e));
    }else{
        res.status(404).send()
    }
})

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    if(ObjectId.isValid(id)){
        ToDo.findByIdAndRemove(id).then(
            (result) => {
                if(!result){
                    return res.status(404).send("no result")
                }
                res.status(200).send({result})
            },
            (error) => res.status(404).send("error in deleting")
        ).catch((e) => res.status(400).send(e))
    }else{
        res.status(404).send("Invalid id")
    }
})

app.listen(port, () => console.log(`server is running at port ${port}`))

module.exports = {app}