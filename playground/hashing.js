const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = {
    id: 10
}
//jwt.sign to add the hashing. it takes two arguments one is data Object and other is secret.
const token = jwt.sign(data, '123abc');
//for verify we use jwt.verify which return the data if we pass the secret
const decoded = jwt.verify(token, '123abc');
console.log(decoded);
// const message = 'Hi this is Abhay';
// const hash = SHA256(message).toString();

// console.log(`message is ${message} and crypto message is ${hash}`);

// let data = {
//     id: 4
// }
//Adding hash in data
// let token = {
//     data,
//     hash: SHA256(JSON.stringify(data)+ 'somesecret').toString()
// }
//If we changed the data then still we are unable to find teh secret so we cannot manipulate with hash.
// token.data.id = 5;
// token.data.hash = SHA256(token.data).toString();
//Converting the resulted data into hash using salting for somesecret
// let resultHash = SHA256(JSON.stringify(token.data)+'somesecret').toString()

// if(token.hash === resultHash) {
//     console.log(`Data was not changed`);
// }else{
//     console.log(`Data was changed. Don't trust`);
// }


