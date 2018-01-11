'use strict';
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const models = require('../lib/models');
const should = chai.should();
const assert = chai.assert;
chai.use(chaiHttp);

let userId;
let token;

describe("Create user", () => {
    let error = true;
    let result;
	let body = {
        "first": "john",
        "last": "doe",
        "email": "jdoe@us.company.com",
        "password": "password1"
	};
    before(done => {
        chai.request(server)
            .post('/user')
            .set('content-type', 'application/json')
            .send(body)
            .end((err, res, body) => {
                error = err;
                result = res;
                userId = result.body.id;
                done();
            });
    });
    describe("Results", () => {
        it("should not return an error", () => {
            should.not.exist(error);
        });
        it("should return a 200 code", () => {
            result.should.have.status(200);
        });
        it("should have created a new entry", () => {
            result.body.created.should.equal(true);
        });
        it("should return the user's id", () => {
            result.body.id.should.be.a('number');
        });
    });
});

describe("Login", () => {
    let error = true;
    let result;
    const body = {
        "email": "jdoe@us.company.com", 
        "password": "password1"
    };
    before(done => {
        chai.request(server)
            .post('/user/login')
            .set('content-type', 'application/json')
            .send(body)
            .end((err, res) => {
                error = err;
                result = res;
                token = result.body.token
                done();
            })
    });
    describe("Results", () => {
        it("should not return an error", () => {
            should.not.exist(error);
        });
        it("should return a 200 code", () => {
            result.should.have.status(200);
        });
        it("should return the user object", () => {
            result.body.should.be.a("object");
        });
        it("should return a user's email", () => {
            result.body.email.should.be.a('string');
        });
        it("should return the correct user", () => {
            result.body.email.should.equal("jdoe@us.company.com");
        });
        it("should return the user's token", () => {
            result.body.token.should.be.a('string');
        });
    });
});

describe("Get user(yourself)", () => {
    let error = true;
    let result;
    before(done => {
        chai.request(server)
            .get('/user')
            .set('x-token', token)
            .set('x-user-id', userId)
            .query({email: "jdoe@us.company.com"})
            .end((err, res) => {
                error = err;
                result = res;
                done();
            });
    });
    describe("Results", () => {
        it("should not return an error", () => {
            should.not.exist(error);
        });
        it("should return a 200 code", () => {
            result.should.have.status(200);
        });
        it("should return the user object", () => {
            result.body.should.be.a("object");
        });
        it("should return a user's email", () => {
            result.body.email.should.be.a('string');
        });
        it("should return the correct user", () => {
            result.body.email.should.equal("jdoe@us.company.com");
        });
    });
    after(done => {
        // We can use this after hook for dropping all rows in users and user_tokens 
        models.users.destroy({truncate: true, cascade: true})
        .then(() => {
            done();
        })
    });    
});
