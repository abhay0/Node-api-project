const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
    if(err){
        return console.log(`unable to connect the Mongo DB : ${err}`)
    }
    const db = client.db('ToDoApp');
    // db.collection('ToDo').findOneAndUpdate({
    //         _id: new ObjectID('5af7f23b40ba2b27e0409c5c')
    //     }, {   
    //         $set: {
    //             completed: true
    //         }
    //     }, {
    //         returnOriginal: false
    //     }
    // ).then(
    //     (result) => {
    //           console.log(`result: ${JSON.stringify(result)}`)
    //     },
    //     (err) => {
    //         console.log(`Error: ${err}`)
    //     }
    // )
    db.collection('Users').findOneAndUpdate(
        {
             _id: new ObjectID('5af7c754cf258e25e009daa3')
        }, {
            $set: {
                name: 'Ashutosh Kumar Shahi'
            },
            $inc: {
                age: 1
            }
        },
        {
            returnOriginal: false
        }
    ).then( (result) => console.log(`result: ${JSON.stringify(result, undefined, 2)}`),
            (error) => console.log(`Error: ${error}`));
    // client.close();
});