const {mongoose} = require('../server/db/mongoose');

const {ToDo} = require('../server/models/todo');
const {User} = require('../server/models/users');
const {ObjectId} = require('mongodb');

// ToDo.remove().then(
//     (data) => console.log(`deleted successfully ${JSON.stringify(data)}`),
//     (error) => console.log(`error occoured ${JSON.stringify(error)}`)
// ).catch((e) => console.log(`catch error : ${JSON.stringify(e)}`));

const id = '5b079d495244d42a04af851b67';

// ToDo.findOneAndRemove().then(
//         (data) => console.log(`deleted successfully ${JSON.stringify(data)}`),
//         (error) => console.log(`error occoured ${JSON.stringify(error)}`))
//     .catch((e) => console.log(`catch error : ${JSON.stringify(e)}`));


ToDo.findByIdAndRemove(id).then(
    (data) => console.log(`deleted successfully ${JSON.stringify(data)}`),
    (error) => console.log(`error occoured ${JSON.stringify(error)}`))
.catch((e) => console.log(`catch error : ${JSON.stringify(e)}`));    