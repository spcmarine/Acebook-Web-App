const app = require("../../app");
const request = require("supertest");
const mongoose = require("mongoose");
require("../mongodb_helper");

describe("/users", () => {

  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  test("POST => creates a user when email and pass are provided", done => {
    request(app)
      .post("/users")
      .send({email: "poppy@email.com", password: "1234"})
      .then(response => {
        expect(response.statusCode).toBe(201)
        done()
      })
  })

  test("POST => does not create a user when password is missing", done => {
    request(app)
      .post("/users")
      .send({email: "poppy@email.com"})
      .then(response => {
        expect(response.statusCode).toBe(400)
        done()
      })
  })

  test("POST => does not create a user when email is missing", done => {
    request(app)
      .post("/users")
      .send({password: "1234"})
      .then(response => {
        expect(response.statusCode).toBe(400)
        done()
      })
  })
})