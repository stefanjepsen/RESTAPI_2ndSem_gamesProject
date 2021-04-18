//Switch db to test enviroment
process.env.NODE_ENV = 'test';
const Game = require('../models/game');
const User = require('../models/user');



//Cleanup before running tests
before((done) => {
    Game.deleteMany({}, function(err) {});
    User.deleteMany({}, function(err) {});
    done();
});

//Cleaning up DB_Test after usage
after((done) => {
    User.deleteMany({}, function(err) {});
    Game.deleteMany({}, function(err) {});
    done();
});