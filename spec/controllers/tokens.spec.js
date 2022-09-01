const app = require("../../app");
const request = require("supertest");
const mongoose = require("mongoose");
require("../mongodb_helper");
const User = require('../../models/user');

describe("/tokens", () => {
  beforeEach( async () => {
    await mongoose.connection.collections.users.drop(() => {});
    const user = new User({email: "test@test.com", password: "12345678"})
    await user.save()
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