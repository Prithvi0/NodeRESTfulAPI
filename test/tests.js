var app = require('../server');
const chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = require('chai').expect;

describe("Tests for user API", () => {
    it("given route should return true status", () => {
        chai.request(app)
            .get("/")
            .end((err, res) => {
                expect(res.body.message).to.equals("Welcome User!");
            });
    });
});