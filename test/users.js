process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const models = require('../lib/models');
const should = chai.should();
const assert = chai.assert;
chai.use(chaiHttp);

describe("Create user", () => {
    let error = true;
    let result;
	let body = {
        "first": "john",
        "last": "doe",
        "email": "jdoe@us.company.com"
	};
    before(done => {
        chai.request(server)
            .post('/user')
            .set('content-type', 'application/json')
            .set('x-token', 'some-token')
            .send(body)
            .end((err, res, body) => {
                error = err;
                result = res;
                done();
            });
    })
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
    })
    after(done => {
        // Let's make sure to drop all rows. We can use the after hook for this
        models.users.sync({force: true})
        .then(() => {
            done();
        })
    })
});
