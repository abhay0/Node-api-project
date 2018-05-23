const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
    if(err){
        return console.log(`unable to connect the Mongo DB : ${err}`)
    }
    console.log("Connected to MongoDB server");
    const db = client.db('ToDoApp');

    db.collection('Users').find({_id: new ObjectID('5b03d629cb560d316ca787a1')}).toArray().then((docs) => {
        console.log(`ToDos Array: ${JSON.stringify(docs, undefined, 2)} `)
    }, (err) => {
        console.log(`Error : ${err}`)
    })
    // client.close();
});