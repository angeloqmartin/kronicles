// => add integration tests for all four of the API endpoints. 
// => integration tests should use the strategy described in the previous assignment 
// => set up db in known state
// => make a request to API 
// => inspect response, 
// => inspect state of db, and tear down db

'use strict';

const chai = require("chai");
const chaiHttp = require("chai-http");
const faker = require('faker');
const mongoose = require('mongoose');
const expect = chai.expect;

// makes 'should' syntax available throughout module
const should = chai.should();

const {
    TripReport
} = require('../trips/model');

const {
    closeServer,
    runServer,
    app
} = require('../server');

const {
    TEST_DATABASE_URL,
} = require('../config');

chai.use(chaiHttp);

function tearDownDb() {
    return new Promise((resolve, reject) => {
        console.warn('Deleting database');
        mongoose.connection.dropDatabase()
            .then(result => resolve(result))
            .catch(err => reject(err));
    });
}

// put randomish documents in db  
// to have data to work with and assert about.
// use Faker library to automatically
// generate placeholder values for title and content
// then insert that data into mongo
function seedTripData() {
    console.info('seeding blog post data');
    const seedData = [];
    for (let i = 1; i <= 10; i++) {
        seedData.push({
            title: faker.lorem.sentence(),
            content: faker.lorem.text()
        });
    }
    // this should return a promise
    return TripReport.insertMany(seedData);
}

describe('trip reports API resource', function () {

    before(function () {
        return runServer(TEST_DATABASE_URL);
    });

    beforeEach(function () {
        return seedTripData();
    })

    afterEach(function () {
        //tear down database so we ensure no state 
        //from this test effects any coming after
        return tearDownDb()
    });

    after(function () {
        return closeServer();
    });

    describe('simple pre test', function () {

        // test - verifies that when you hit 
        // up the root url you get a 200 status code and HTML
        it("should exist", function () {
            return chai
                .request(app)
                .get("/trip-report")
                .then(function (res) {
                    expect(res).to.have.status(200);
                });
        });
    })

    describe('GET endpoint', function () {

        it('should return all existing post', function () {

            // strategy
            //// 1. get back all post returned by GET request to '/posts'
            //// 2. prove res has right status, data type
            //// 3. prove the number of posts we got back is equal to number in db
            let res;
            return chai.request(app)
                .get('/trip-report')
                .then(_res => {
                    res = _res;
                    res.should.have.status(200);
                    res.body.should.have.lengthOf.at.least(1);
                    return TripReport.count();
                })
        });

        it('should return trips with right fields', function () {
            //strategy:
            ////1. Get back all post            
            let resTrip;
            return chai.request(app)
                .get('/trip-report')
                .then(function (res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                })
        });
    });

    describe('POST endpoint', function () {

        // strategy: make a POST request with data,
        // then prove that the post we get back has
        // right keys, and that `id` is there
        it('should add a new blog post', function () {
            const newTrip = {
                title: faker.lorem.sentence(),
                content: faker.lorem.text()
            };

            return chai.request(app)
                .post('/trip-report')
                .send(newTrip)
                .then(function (res) {
                    res.should.have.status(201);
                    res.should.be.json;
                });
        });
    });
    describe('PUT endpoint', function () {

        //strategy:
        // 1. Get an existing post from db
        // 2. Make a PUT request to update post
        // 3. Prove post in db in correctly updated
        it('should update fields sent over', function () {
            const updateData = {
                title: 'test data',
                content: 'enter content here'
            }
            return TripReport
                .findOne()
                .then(post => {
                    updateData.id = post._id;
                    return chai.request(app)
                        .put(`/trip-report/${post._id}`)
                        .send(updateData)
                })
                .then(res => {
                    res.should.have.status(200);
                    return TripReport.findById(updateData.id)
                })
        })
    });
    describe('DELETE endpoint', function () {

        //strategy:
        //1. get a post
        //2. make a DELETE request for the post's id
        //3. assert response has right status code
        //4. prove that post with the id doen't exist in db anymore
        it('should delete a post id', function () {
            let post;
            return TripReport
                .findOne()
                .then(_post => {
                    post = _post;
                    return chai.request(app).delete(`/trip-report/${post.id}`);
                })
                .then(res => {
                    res.should.have.status(200);
                    return TripReport.findById(post.id)
                })
            .then(_post => {
                should.not.exist(_post);
            });
        });
    });
});