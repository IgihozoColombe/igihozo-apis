let chai = require('chai');
let chaiHttp = require('chai-http'); 
let server = require('../index');


chai.should();
chai.use(chaiHttp);


describe("Contact APIs", () => {
 
  describe("GET /query/queries", () => {
    const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjZhNDBjYmY1MWI4NzJhNmM5ZGJjNTciLCJpYXQiOjE2NTE1OTg5MDEsImV4cCI6MTY1MTYyNzcwMX0.E8y-xeOTREutJqjvuJicW7dIHTg42fWmnLkmRAkyNa0"
    it("It should GET all the query", (done) => 
    {
      chai
        .request(server)
        .get("/query/queries")
        .set({ Authorization: `${token}`})
        .end((err, response) => {
          response.should.have.status(200);
        
          done();
        });
    });

    it("It should NOT GET all the query", (done) => {
      chai
        .request(server)
        .get("/query/queries")
        .end((err, response) => {
          response.should.have.status(401);
          done();
        });
    });
  });


  describe("POST /query/queries", () => {
    it("It should create a new query", (done) => {
     
      const blog = {
        title: "testing creating a new blog",
        body: "this is the body of blog",
        status: "description goes here",
      };
      chai
        .request(server)
        .post("/query/queries")
        .send(blog)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          
          done();
        });
    });
  });



});