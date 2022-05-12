let mongoose = require("mongoose");
let Article = require('../models/article');
const User=require("../models/user")
let chai = require('chai');
let chaiHttp = require('chai-http'); 
let server = require('../index');
let should = chai.should();


chai.use(chaiHttp);

describe('users', () => {
  
    describe('/GET users', () => {
      const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjZhNDBjYmY1MWI4NzJhNmM5ZGJjNTciLCJpYXQiOjE2NTE2NTY5Mjh9.MkrsopUmRxjn1zEzSJHD24K7U0oWBPRn-GFYyJ-8H3E"
        it('it should GET all the user', (done) => {
              chai.request(server)
              .get('/users/users')
              .set({ Authorization: `${token}`})
              .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    
                done();
              });
        });
        it('it should not  GET all the user', (done) => {
          chai.request(server)
          .get('/users/users')
          .end((err, res) => {
                res.should.have.status(401);
                res.should.be.json;
                
            done();
          });
    });
    });
  describe('/POST users', () => {
  
      it('it should login a users ', (done) => {
        let user = {
            email:"ganza@gmail.com",
            password:"abanabeza"
         }
            chai.request(server)
            .post('/users/signin')
            .send(user)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                
              done();
            });
      });
  });
  describe('/POST users', () => {
    it('it should not POST a user ', (done) => {
        let user = {
           email:"ganza@gmail.com",
           password:"abanabeza"
        }
          chai.request(server)
          .post('/users/signup')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                
            done();
          });
    });
    
});
 describe("PUT users", () => {
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
        .put("/users/updateUser")
        .set({ Authorization: `${token}`})
        .send(user)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
      
          done();
        });
    });
  });
  describe("PUT users", () => {
    it("It should not update an existing users", (done) => {
    
        const user = {
          name: "testing creating a new blog",
          username: "this is the body of blog",
          email: "description goes here",
        };
      chai
        .request(server)
        .put("/users/updateUser")
        .send(user)
        .end((err, response) => {
          response.should.have.status(401);
          response.body.should.be.a("object");
      
          done();
        });
    });
  });
  describe("PUT users", () => {
    it("It should change password of users", (done) => {
    
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
        .put("/users/changePassword")
        .set({ Authorization: `${token}`})
        .send(user)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
      
          done();
        });
    });
  });
  describe("PUT users", () => {
    it("It should not change password of users", (done) => {
    
        const user = {
          email: "nyituriki@gmail.com",
          oldPassword: "password&*12",
          newPassword: "newpassword#$12",
          confirmPassword:"newpassword#$12"
        };
      chai
        .request(server)
        .put("/users/changePassword")
        .send(user)
        .end((err, response) => {
          response.should.have.status(401);
          response.body.should.be.a("object");
      
          done();
        });
    });
  });
})

