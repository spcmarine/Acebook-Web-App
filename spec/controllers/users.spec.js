const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user')

describe("/users", () => {
  afterAll( async () => {
    await User.deleteMany({});
  });

  test("POST => creates a user when email and pass are provided", async () => {
    let response = await request(app)
      .post("/users")
      .send({email: "poppy@email.com", password: "1234"})
    expect(response.statusCode).toBe(201)
  })

  test("POST => does not create a user when password is missing", async () => {
    let response = await request(app)
      .post("/users")
      .send({email: "scarlett@email.com"})
    expect(response.statusCode).toBe(400)
  })

  test("POST => does not create a user when email is missing", async () => {
    let response = await request(app)
      .post("/users")
      .send({password: "1234"})
    expect(response.statusCode).toBe(400)
  })
})