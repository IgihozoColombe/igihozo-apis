let mongoose = require("mongoose");
let Article = require('../models/article');
const User=require("../models/user")
let chai = require('chai');
let chaiHttp = require('chai-http'); 
let server = require('../index');
let should = chai.should();


chai.use(chaiHttp);

describe('User', () => {
  
    describe('/GET user', () => {
      const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjZhNDBjYmY1MWI4NzJhNmM5ZGJjNTciLCJpYXQiOjE2NTE1ODk1ODQsImV4cCI6MTY1MTYxODM4NH0.s2kaoDzzz-712VTjkx5xDPLK4foDmf2l48mb97x3vZ8"
        it('it should GET all the user', (done) => {
              chai.request(server)
              .get('/user/users')
              .set({ Authorization: `Bearer ${token}` })
              .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    
                done();
              });
        });
        it('it should not  GET all the user', (done) => {
          chai.request(server)
          .get('/user/users')
          .end((err, res) => {
                res.should.have.status(401);
                res.should.be.json;
                
            done();
          });
    });
    });
  describe('/POST user', () => {
  
      it('it should login a user ', (done) => {
        let user = {
            email:"ganza@gmail.com",
            password:"abanabeza"
         }
            chai.request(server)
            .post('/user/signin')
            .send(user)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                
              done();
            });
      });
  });
  describe('/POST user', () => {
    it('it should not POST a user ', (done) => {
        let user = {
           email:"ganza@gmail.com",
           password:"abanabeza"
        }
          chai.request(server)
          .post('/user/signup')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                
            done();
          });
    });
    
});

})

