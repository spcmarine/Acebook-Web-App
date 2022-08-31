const app = require("../../app");
const request = require("supertest");
const mongoose = require("mongoose");
require("../mongodb_helper");
const User = require('../../models/user');

describe("/tokens", () => {
  beforeEach((done) => {
    const user = new User({email: "test@test.com", password: "12345678"})
    user.save(() => { done() })
  });

  afterEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  test("a token is returned when creds are valid", done => {
    request(app)
      .post("/tokens")
      .send({email: "test@test.com", password: "12345678"})
      .then(response => {
        expect(response.body.token).not.toEqual(undefined)
        done();
      })
  })
})