let chai = require('chai');
let chaiHttp = require('chai-http'); 
let server = require('../index');


chai.should();
chai.use(chaiHttp);


describe("Blogs APIs", () => {
 
  describe('/GET user', () => {
    const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjZhNDBjYmY1MWI4NzJhNmM5ZGJjNTciLCJpYXQiOjE2NTE2NTY5Mjh9.MkrsopUmRxjn1zEzSJHD24K7U0oWBPRn-GFYyJ-8H3E"
      it('it should GET all the articles', (done) => {
            chai.request(server)
            .get('/blogs')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                  res.should.have.status(200);
                  res.should.be.json;
                  
              done();
            });
      });
    it("It should NOT GET all the articles", (done) => {
      chai
        .request(server)
        .get("/blogs")
        .end((err, response) => {
          response.should.have.status(401);
          done();
        });
    });
  });



  describe("GET /blogs/:id", () => {
    it("It should GET a blog by ID", (done) => {
      const blogId = "626a40f2f51b872a6c9dbc5c";
      const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjZhNDBjYmY1MWI4NzJhNmM5ZGJjNTciLCJpYXQiOjE2NTE2NTY5Mjh9.MkrsopUmRxjn1zEzSJHD24K7U0oWBPRn-GFYyJ-8H3E";
      chai
        .request(server)
        .get("/blogs/" + blogId)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
       
          done();
        });
    });
    it("It should not  GET a blog by ID", (done) => {
      const blogId = "626a40f2f51b872a6c9dbc5c";
      chai
        .request(server)
        .get("/blogs/" + blogId)
        .end((err, response) => {
          response.should.have.status(401);
          response.body.should.be.a("object");
       
          done();
        });
    });
  });

  /**
   * Test the POST route
   */
  describe("POST /blogs", () => {
    it("It should create a new article", (done) => {
    
      const blog = {
        title: "testing creating a new blog",
        body: "this is the body of blog",
        status: "description goes here",
      };
      chai
        .request(server)
        .post("/blogs")
        .send(blog)
        .end((err, response) => {
          response.should.have.status(401);
          response.body.should.be.a("object");
          
          done();
        });
    });
    it("It should not  create a new article", (done) => {
      const blog = {
        title: "testing creating a new blog",
        body: "this is the body of blog",
        status: "description goes here",
      };
      chai
        .request(server)
        .post("/blogs")
        .send(blog)
        .end((err, response) => {
          response.should.have.status(401);
          response.body.should.be.a("object");
          
          done();
        });
    });
  });

  /**
   * Test the PUT route
   */

  describe("PUT /blogs/:id", () => {
    it("It should update an existing blog", (done) => {
      const blogId = "626a40f2f51b872a6c9dbc5c";
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjZhNDBjYmY1MWI4NzJhNmM5ZGJjNTciLCJpYXQiOjE2NTE2NTY5Mjh9.MkrsopUmRxjn1zEzSJHD24K7U0oWBPRn-GFYyJ-8H3E";
        const blog = {
          title: "testing creating a new blog",
          body: "this is the body of blog",
          status: "description goes here",
        };
      chai
        .request(server)
        .put("/blogs/" + blogId)
        .set({ Authorization: `Bearer ${token}` })
        .send(blog)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
      
          done();
        });
    });
    it("It should not  update an existing blog", (done) => {
      const blogId = "626a40f2f51b872a6c9dbc5c";
        const blog = {
          title: "testing creating a new blog",
          body: "this is the body of blog",
          status: "description goes here",
        };
      chai
        .request(server)
        .put("/blogs/" + blogId)
        .send(blog)
        .end((err, response) => {
          response.should.have.status(401);
          response.body.should.be.a("object");
      
          done();
        });
    });
  });

    /**
   * Test the PUT route
   */

describe("PUT /blogs/comment/:id", () => {
    it("It should add comment on an existing blog", (done) => {
      const blogId = "626a40f2f51b872a6c9dbc5c";
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjZhNDBjYmY1MWI4NzJhNmM5ZGJjNTciLCJpYXQiOjE2NTE2NTY5Mjh9.MkrsopUmRxjn1zEzSJHD24K7U0oWBPRn-GFYyJ-8H3E";
      const blog = {
        comment: "new comment after patching!",
      };
      chai
        .request(server)
        .put("/blogs/"+blogId+"comment")
        .set({ Authorization: `Bearer ${token}` })
        .send(blog)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });
  describe("PUT comment on a blog", () => {
    it("It should add comment on an existing blog", (done) => {
      const blogId = "626a40f2f51b872a6c9dbc5c";
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjZhNDBjYmY1MWI4NzJhNmM5ZGJjNTciLCJpYXQiOjE2NTE2NTY5Mjh9.MkrsopUmRxjn1zEzSJHD24K7U0oWBPRn-GFYyJ-8H3E";
      chai
        .request(server)
        .put("/blogs/"+blogId+"comment")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });


  /**
   * Test the DELETE route
  //  */
  // describe("DELETE /article/:id", () => {
  //   it("It should DELETE an existing blog", (done) => {
  //     const blogId = "626a40f2f51b872a6c9dbc5c";
  //     const token =
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjZhNDBjYmY1MWI4NzJhNmM5ZGJjNTciLCJpYXQiOjE2NTE0ODQ3MTIsImV4cCI6MTY1MTUxMzUxMn0.57-KBOcDY_EPcFWz2lnV-AzX69lqBISlrFXTevej6F4";
  //     chai
  //       .request(server)
  //       .delete("/article/" + blogId)
  //       .set({ Authorization: `Bearer ${token}` })
  //       .end((err, response) => {
  //         response.should.have.status(200);
  //         done();
  //       });
  //   });
  // });

});