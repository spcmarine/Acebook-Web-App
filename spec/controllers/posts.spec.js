const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Post = require('../../models/post');
const User = require('../../models/user');
const TokenGenerator = require('../../models/token_generator');
let token;

describe("/posts", () => {
  beforeAll( async () => {
    const user = new User({email: "test@test.com", password: "12345678"});
    await user.save();
    token = TokenGenerator.jsonwebtoken(user.id);
  });

  afterAll( async () => {
    await User.deleteMany({})
    await Post.deleteMany({})
  })

  test("POST => responds with a 201, when token is valid", async () => {
    let response = await request(app)
      .post("/posts")
      .send({ message: "hello world", token: token })
    expect(response.status).toEqual(201);
    let posts = await Post.find();
    console.log("posts ", posts);
  });

  test("POST => responds with a 401, when token is missing", async () => {
    let response = await request(app)
      .post("/posts")
      .send({ message: "hello again world" })
    expect(response.status).toEqual(401);
  });
});
