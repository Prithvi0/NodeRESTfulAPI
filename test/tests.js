const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = require('chai').expect;

describe("Tests for user API", () => {
    it("given route should return true status", () => {
        chai.request(app)
            .get("/")
            .end((err, res) => {
                expect(res.body.message).to.equals("Welcome User!");
            });
    });

    it("given mongo url when requested should return correct port", () => {
        chai.request(app)
            .get("/")
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
            });
    });
});