//Switch db to test enviroment
process.env.NODE_ENV = 'test';

const Game = require('../models/game');

const assert = require('chai').assert;
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../server.js');

chai.use(chaiHttp);

//Cleanup before running tests
before((done) => {
    Game.deleteMany({}, function(err) {});
    done();
});

//Cleaning up DB_Test after usage
after((done) => {
    Game.deleteMany({}, function(err) {});
    done();
});





describe('/first test Collection', () => {

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


    it('Should POST a valid product', (done) => {

        let game ={
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




});