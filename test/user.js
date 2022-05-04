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
      const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjZhNDBjYmY1MWI4NzJhNmM5ZGJjNTciLCJpYXQiOjE2NTE2NTY5Mjh9.MkrsopUmRxjn1zEzSJHD24K7U0oWBPRn-GFYyJ-8H3E"
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
 describe("PUT user", () => {
    it("It should update an existing user", (done) => {
    
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjZhNDBjYmY1MWI4NzJhNmM5ZGJjNTciLCJpYXQiOjE2NTE2NTY5Mjh9.MkrsopUmRxjn1zEzSJHD24K7U0oWBPRn-GFYyJ-8H3E";
        const user = {
          name: "testing creating a new blog",
          username: "this is the body of blog",
          email: "description goes here",
        };
      chai
        .request(server)
        .put("/user/updateUser")
        .set({ Authorization: `Bearer ${token}` })
        .send(user)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
      
          done();
        });
    });
  });
  describe("PUT user", () => {
    it("It should update an change password of user", (done) => {
    
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjZhNDBjYmY1MWI4NzJhNmM5ZGJjNTciLCJpYXQiOjE2NTE2NTY5Mjh9.MkrsopUmRxjn1zEzSJHD24K7U0oWBPRn-GFYyJ-8H3E";
        const user = {
          email: "nyituriki@gmail.com",
          oldPassword: "password&*12",
          newPassword: "newpassword#$12",
          confirmPassword:"newpassword#$12"
        };
      chai
        .request(server)
        .put("/user/changePassword")
        .set({ Authorization: `Bearer ${token}` })
        .send(user)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
      
          done();
        });
    });
  });
})

