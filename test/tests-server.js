"use strict";


const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server.js");
const expect = chai.expect;

chai.use(chaiHttp);

// test test - verifies that when you hit 
// up the root url you get a 200 status code and HTML
describe("index page", function() {
    it("should exist", function () {
        return chai
        .request(app)
        .get("/")
        .then(function(res) {
            expect(res).to.have.status(200);
        });
    });
});

