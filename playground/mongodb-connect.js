// const MongoClient = require('mongodb').MongoClient;
//Object destructuring
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
    if(err){
        return console.log(`unable to connect the Mongo DB : ${err}`)
    }
    console.log("Connected to MongoDB server");
    const db = client.db('ToDoApp');

    // db.collection('ToDo').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // },(err, result) => {
    //     if(err){
    //         return console.log(`Unable to insert the data : ${err}`)
    //     }
    //     console.log(`Successfully Inserted: ${JSON.stringify(result.ops, undefined, 2)}`);
    // })

    db.collection('Users').insertOne({
        name: "Abhay Pratap Singh",
        age: 28,
        location: "Pocket -5, Mayur vihar Phase 1, New Delhi - 110092"
    },(err, result) => {
        if(err){
            return console.log(`Unable to insert the data : ${err}`)
        }
        console.log(`Successfully Inserted: ${JSON.stringify(result.ops, undefined, 2)}`);
    })


    client.close();
});