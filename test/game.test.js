const assert = require('chai').assert;
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../server.js');

chai.use(chaiHttp);







describe('first test Collection', () => {

    it('Testing welcome route', (done) => {
        chai.request(server)
            .get('/api/welcome')
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');
                const actualValue = res.body.message;
                expect(actualValue).to.be.equal('Welcome To the api');
                //console.log(res.body.message); 
                // let msg =  res.body.message; <-- Giver en besked i consol med den tekst besked som følger med route. 
                // console.log(msg);
                done();
            });
    });

    it('Verify that we have 0 games in the db', (done) => {
        chai.request(server)
            .get('/api/games')
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('array');
                expect(res.body).to.have.lengthOf(0);
                done();
            });
    });




    it('Should POST a valid game', (done) => {

        let game = {
            name: "testGame",
            publisher: "Testy",
            genre: "cakeAdventure",
            details: "Lorem Opsum",
            releaseYear: "1993",
            recommended: true
        }

        chai.request(server)
            .post('/api/games')
            .send(game)
            .end((err, res) => {
                expect(res.status).to.be.equal(201);
                done();
            });
    });

    it('Verify that we have 1 game in the db', (done) => {
        chai.request(server)
            .get('/api/games')
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('array');
                expect(res.body).to.have.lengthOf(1);
                done();
            });
    });

    it('Checks if invalid game and correct error message', (done) => {

        let game = {
            name: "123",
            publisher: "123",
            genre: "123",
            details: "123",
            releaseYear: "Not Released",
            recommended: 123
        }

        chai.request(server)
            .post('/api/games')
            .send(game)
            .end((err, res) => {
                expect(res.status).to.be.equal(500);
                done();
            });
    });


    //Checks if can make a valid user
    it('Create a valid user credential', (done) => {
        let userCredentials = {
            name: "user_test_1",
            email: "user_test_1@test.dk",
            password: "123456789"

        }

        chai.request(server)
            .post('/api/user/register')
            .send(userCredentials)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body.error).to.be.equal(null);
                done();
            });
    });

    //Checks if can make a valid user
    it('Checks if sends correct error when sending an already existing email address ', (done) => {
        let userCredentials = {
            name: "test",
            email: "user_test_1@test.dk",
            password: "123456789"

        }

        chai.request(server)
            .post('/api/user/register')
            .send(userCredentials)
            .end((err, res) => {
                expect(res.status).to.be.equal(400);
                expect(res.body).to.be.a('object');
                done();
            });
    });




});