const env = process.env.NODE_ENV || 'development';

console.log('ENV environment ************', env);

if(env === 'development'){
    process.env.PORT = 3002;
    process.env.MONGODB_URI = "mongodb://localhost:27017/ToDoApp";
}else if(env === 'test') {
    process.env.PORT = 3002;
    process.env.MONGODB_URI = "mongodb://localhost:27017/ToDoAppTest";

}


const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {ToDo} = require('./models/todo');
const {User} = require('./models/users');
const {authenticate} = require('./middleware/authenticate')

const port = process.env.PORT || 3002;

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let newTodo = new ToDo({
        text: req.body.text
    });

    newTodo.save().then(
        (todo) => res.status(200).send(todo),
        (err) => res.status(400).send(err)
    )
})

app.get('/todos', (req, res) => {
    ToDo.find().then(
        (todo) => res.status(200).send({todo}),
        (err)=> res.status(400).send(err)
    )
})

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    if(ObjectId.isValid(id)){
        ToDo.findById(id).then(
            (todo) => {
            if(!todo){
                return res.status(400).send()
            }
            res.status(200).send({todo})
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
            (todo) => {
                if(!result){
                    return res.status(404).send("no result")
                }
                res.status(200).send({todo})
            },
            (error) => res.status(404).send("error in deleting")
        ).catch((e) => res.status(400).send(e))
    }else{
        res.status(404).send("Invalid id")
    }
})

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectId.isValid(id)){
        return res.status(404).send()
    };

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    ToDo.findByIdAndUpdate(id, {$set : body}, {new: true})
        .then((todo) => {
            if(!todo) {
                return res.status(404).send()
            }
            res.status(200).send({todo});
        })
        .catch((e) => res.status(400).send())
})

app.post('/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password'])
    const user = new User(body);

    user.save().then(() => user.generateAuthToken()
    ).then((token) => res.header('x-auth', token).send(user)
    ).catch((e) => res.status(400).send(e))
});

app.get('/user/me', authenticate, (req, res) => {
    res.send(req.user);
})

app.listen(port, () => console.log(`server is running at port ${port}`))

module.exports = {app}