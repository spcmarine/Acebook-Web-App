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
        expect(response.status).toEqual(200)
        expect(response.body.message).toEqual("OK")
        done();
      })
  })

  test("a token is not returned when creds are invalid", done => {
    request(app)
      .post("/tokens")
      .send({email: "test@test.com", password: "1234"})
      .then(response => {
        expect(response.body.token).toEqual(undefined)
        expect(response.status).toEqual(401)
        expect(response.body.message).toEqual("auth error")
        done();
      })
  })
})