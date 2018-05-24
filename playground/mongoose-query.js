const {ObjectId} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {User} = require('../server/models/users');

const id = '5af81e2ba567e9179c4a4db34';

// if(!ObjectId.isValid(id)){
//     console.log(`Id is not valid`);
// }

User.findById(id).then((user)=>{
    if(!user){
        return console.log(`user not find`);
    }
    console.log(`value coming from ${user}`)
}, (error) => console.log(`User Not found ${error}`)).catch((e) => console.log(`Error is : ${e}`))