const { describe, it } = require("mocha");
const supertest = require("supertest");
const  app = require("../server");

describe("login user",function (){
    this.timeout(5000);

    it("check email and paswword ", done => {
        supertest(app)
        .post('/user/login')
        .send({
            email: 'twwgwgwgwgw',
            password:"qwwerrrr"
        })
        .expect({error:true, message:`Please provide an email and password`, statusCode:400 }, (err, res) => {
            done();
          })

    })

    it("check a user ", done => {
        supertest(app)
        .post('/user/login')
        .send({
            email: "adexsquare4192@gmail.com",
            password:"1234567"
        })
        .expect({error:true, message:`User not found with email of adexsquare4192@gmail.com`, statusCode:404 }, (err, res) => {
            done();
          })

    })

    it("check a password ", done => {
        supertest(app)
        .post('/user/login')
        .send({
            email: "adexsquare4192@gmail.com",
            password:"1234567"
        })
        .expect({error:true, message:`Invalid password`, statusCode:401 }, (err, res) => {
            done();
          })

    })

    it("login successfully ", done => {
        supertest(app)
        .post('/user/login')
        .send({
            email: "adexsquare4192@gmail.com",
            password:"1234567"
        })
        .expect({statusCode:200 }, (err, res) => {
            done();
          })

    })

    
    // console.log('it is working')


})