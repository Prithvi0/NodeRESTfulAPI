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
                expect(res).to.have.status(200);
                expect(res.body.message).to.equals("Welcome User!")
            });
    });

    it('given correct inputs when registration should register user', () => {
        chai.request(app)
            .post("/registration")
            .send({
                UserName: "hel1o",
                emailId: "hello@goomail.com",
                password: "#e11O123"
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body.message).to.equals("User created");
            });
    });

    it('given incorrect input when login should not login user', () => {
        chai.request(app)
            .post("/login")
            .send({
                UserName: "hel1",
                userEmail: "hel1@gmail.com",
                password: ""
            })
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body.message).to.equals("Authentication failed");
            });
    });
});