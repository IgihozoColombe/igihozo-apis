let chai = require('chai');
let chaiHttp = require('chai-http'); 
let server = require('../index');


chai.should();
chai.use(chaiHttp);


describe("Blogs APIs", () => {
 
  describe("GET /article", () => {
    it("It should GET all the article", (done) => {
      chai
        .request(server)
        .get("/article")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          done();
        });
    });

    it("It should NOT GET all the article", (done) => {
      chai
        .request(server)
        .get("/article")
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });


  describe("GET /article/:id", () => {
    it("It should GET a blog by ID", (done) => {
      const blogId = "626a40f2f51b872a6c9dbc5c";
      const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjZlYmZjNDUxZjA5ODMyNjg1YTEwYWUiLCJpYXQiOjE2NTE0ODAzMDIsImV4cCI6MTY1MTUwOTEwMn0.t9TNhuRHpb4dpL5Dr5XdLKAbchqnpsh0DvUWrU6G9Hw";
      chai
        .request(server)
        .get("/article/" + blogId)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
       
          done();
        });
    });
  });

  /**
   * Test the POST route
   */
  describe("POST /article", () => {
    it("It should create a new article", (done) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjZlYmZjNDUxZjA5ODMyNjg1YTEwYWUiLCJpYXQiOjE2NTE0ODAzMDIsImV4cCI6MTY1MTUwOTEwMn0.t9TNhuRHpb4dpL5Dr5XdLKAbchqnpsh0DvUWrU6G9Hw";
      const blog = {
        title: "testing creating a new blog",
        body: "this is the body of blog",
        status: "description goes here",
      };
      chai
        .request(server)
        .post("/article")
        .set({ Authorization: `Bearer ${token}` })
        .send(blog)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          
          done();
        });
    });
  });

  /**
   * Test the PUT route
   */

  describe("PUT /article/:id", () => {
    it("It should update an existing blog", (done) => {
      const blogId = "626a40f2f51b872a6c9dbc5c";
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjZlYmZjNDUxZjA5ODMyNjg1YTEwYWUiLCJpYXQiOjE2NTE0ODAzMDIsImV4cCI6MTY1MTUwOTEwMn0.t9TNhuRHpb4dpL5Dr5XdLKAbchqnpsh0DvUWrU6G9Hw";
        const blog = {
          title: "testing creating a new blog",
          body: "this is the body of blog",
          status: "description goes here",
        };
      chai
        .request(server)
        .put("/article/" + blogId)
        .set({ Authorization: `Bearer ${token}` })
        .send(blog)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
      
          done();
        });
    });
  });

    /**
   * Test the PATCH route
   */

describe("PUT /article/comment/:id", () => {
    it("It should add comment on an existing blog", (done) => {
      const blogId = "626a40f2f51b872a6c9dbc5c";
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjZlYmZjNDUxZjA5ODMyNjg1YTEwYWUiLCJpYXQiOjE2NTE0ODAzMDIsImV4cCI6MTY1MTUwOTEwMn0.t9TNhuRHpb4dpL5Dr5XdLKAbchqnpsh0DvUWrU6G9Hw";
      const blog = {
        comment: "new comment after patching!",
      };
      chai
        .request(server)
        .patch("/article/comment/" + blogId)
        .set({ Authorization: `Bearer ${token}` })
        .send(blog)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.a("object");
          done();
        });
    });
  });


  /**
   * Test the DELETE route
  //  */
  // describe("DELETE /article/:id", () => {
  //   it("It should DELETE an existing blog", (done) => {
  //     const blogId = "62699219189fb405e866c7d3";
  //     const token =
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjYyODI2ZTE0NTc5MTJhOTA0MGU0Y2EiLCJpYXQiOjE2NTEwODYxMzIsImV4cCI6MTY1MTExNDkzMn0.gPVfo0McgWi5V4QiUleowezCI4D4y46btN9ntBPHgJg";
  //     chai
  //       .request(server)
  //       .delete("/article/" + blogId)
  //       .set({ Authorization: `Bearer ${token}` })
  //       .end((err, response) => {
  //         response.should.have.status(400);
  //         done();
  //       });
  //   });
  // });

});