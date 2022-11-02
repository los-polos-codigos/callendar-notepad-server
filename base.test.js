// import request from "supertest";
//
//
// import {app} from './app.js'
//
// const mongoose = require('mongoose');
//
// // jest.useFakeTimers();
//
// // TODO: zawrzeć to w describe
// // test('Base example tests', () => {
// //     request(app).get('/app-health').expect(200).end((err, res) => {
// //         expect(res.text).toBe('OK')
// //         if(err) throw err;
// //     });
// // })
//
//
//
// test('Test 2', async (done) => {
//     // await server();
//
//     // const url = `mongodb://localhost:27017/test-database`
//     // await mongoose.connect(url, { useNewUrlParser: true })
//
//     await mongoose.connect('mongodb://localhost:27017/test-database');
//
//
//     // await request(app).get('/database-health').expect(200);
//
//
//     // done();
//     // await request(app).get('/database-health').expect(200).end((err, res) => {
//     //     if(err) throw err;
//     // }).done();
// })


const mongoose = require('mongoose')
import request from "supertest";
const {app} = require("./app.js");
const databaseName = 'test-database'

describe('asdfasdf', () => {
    // beforeAll(async () => {
    //     await mongoose.connection.close();
    //     const url = `mongodb://127.0.0.1/${databaseName}`
    //     await mongoose.connect(url, { useNewUrlParser: true })
    //     // await mongoose.connect(url)
    // })
    //
    // afterAll(async () => {
    //     await mongoose.connection.close();
    // });

    /* Connecting to the database before each test. */
    beforeEach(async () => {
        await mongoose.connect(`mongodb://127.0.0.1/test-database`);
    });

    /* Closing database connection after each test. */
    afterEach(async () => {
        await mongoose.connection.close();
    });



    it('jeden', async (done) => {
        const res = await request(app).get("/api/products");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
        // expect(1).toBe(1)
        // await request(app).get('/database-health').expect(200);
    })
})

