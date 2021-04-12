//Switch db to test enviroment
process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../server.js');

chai.use(chaiHttp);





describe('/first test Collection',  () => {
    
    it('Testing welcome route', (done) => {
        chai.request(server)
        .get('/api/welcome')
        .end((err, res) => {
         expect(res.status).to.be.equal(200); 
          // let msg =  res.body.message; <-- Giver en besked i consol med den tekst besked som følger med route. 
         // console.log(msg);
            done();
        });
    });



});
