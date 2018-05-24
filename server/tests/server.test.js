const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {ToDo} = require('../models/todo');

//before executing this i want to make sure todo db is blank so i use beforeeach
// const todos = [{
//     text: 'First One'
// }, {
//     text: 'Second'
// }]

beforeEach((done) => {
    ToDo.remove({})
    .then(() => {
        done();
    });
    // ToDo.insertMany(todos).then((d) => done(d))
});


describe('POST /todos', () => {
    it('Should create a new todo function ', (done) => {
        let text= 'todo text new';
        request(app)
                .post('/todos')
                .send({text})
                .expect(200)
                .expect((res) => {
                    expect(res.body.text).toBe(text)
                })
                .end((err, res)=>{
                    if(err){
                        return done(err);
                    }

                    ToDo.find().then((todo) => {
                            expect(todo.length).toBe(1);
                            expect(todo[0].text).toBe(text);
                            done();
                    }).catch((e) => done(e));
                })
    })

    it("Should not created todo with invalid body data", (done) => {
        request(app)
                .post('/todos')
                .send({})
                .expect(400)
                .end((err, res) => {
                    if(err) {return done(err)}
                    ToDo.find().then((todos) => {
                        expect(todos.length).toBe(0);
                        done();
                    }).catch((e) => done(e))
                })
    })
})

// describe('GET /todos', () => {
//     it('Should be return the todo', (done) => {
//         request(app)
//                 .get('/todos')
//                 .expect(200)
//                 .expect((res) => {
//                     expect(res.body.todos.length).toBe(2)
//                 })
//                 .end(done)
//     })
// })
