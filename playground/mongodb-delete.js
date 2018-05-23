const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
    if(err){
        return console.log(`unable to connect the Mongo DB : ${err}`)
    }
    // console.log("Connected to MongoDB server");
    const db = client.db('ToDoApp');

    //delete Many

    db.collection('ToDo').deleteMany({text: 'Walk the dog'}).then(
        (result) => console.log(`result: ${result}`),
        (err) => console.log(`Error: ${err}`)
    )
        //delete One
        db.collection('ToDo').deleteOne({text: 'Walk the dog'}).then(
            (result) => console.log(`result: ${result}`),
            (err) => console.log(`Error: ${err}`)
        )
    //delete Many
    db.collection('ToDo').findOneAndDelete({text: 'Walk the dog'}).then(
        (result) => console.log(`result: ${result}`),
        (err) => console.log(`Error: ${err}`)
    )
    // client.close();
});