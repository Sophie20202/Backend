import request from 'supertest';
import app from '../index'; // Assuming your Express app is exported from app.js
import mongoose from 'mongoose'; // Assuming you're using Mongoose

require('dotenv').config();

import { Blog } from "../models/Blog";
describe("API Endpoints", () => {

  let authtoken: string;
  let blogId: string;
  beforeAll(async () => {
    await mongoose.connect(
        "mongodb+srv://sofidele12:Sophie1992@mukamugema.xgxanbg.mongodb.net/SALES"
    );
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
  it("POST /greet/v1/user should create a user", async () => {
    const user = {
      firstname: "Mukamugema",
      lastname: "sophie",
      email: "sofidele12@gmail.com",
      role: "admin",
      password: "Sophie1992@",
    };
    const response = await request(app).post("/greet/v1/user").send(user);
    expect(response.status).toBe(200);
  });
  it("POST /greet/v1/user/login should log in a user", async () => {
    const admin = {
      email: "sofidele12@gmail.com",
      password: "Sophie1992@",
    };
    const response = await request(app).post("/greet/v1/user/login").send(admin);
    expect(response.status).toBe(200);
    authtoken = response.body.token;
    console.log(authtoken)
    expect(authtoken).toBeTruthy();
  });
  it("POST /greet/v1/blog should create a new blog", async () => {
    let blog= {
      title: "Rwandans",
      message:"Rwandans are beautifull",
      picture: [],
    };
    const response = await request(app)
      .post("/greet/v1/blog")
      .send(blog)
      .set("Authorization",`Bearer ${authtoken}`);
    expect(response.status).toBe(201);
    const { message, brand: createdblog} = response.body;
    const blogWithId = { ...createdblog, id: createdblog._id };
    blogId =  createdblog._id;
  });
  it("GET should return a list of blogs", async () => {
    const response = await request(app)
      .get("/greet/v1/blog")
      .set("Authorization", `Bearer ${authtoken}`);
    expect(response.status).toBe(200);
  });
  it("GET  should return a specific blog with id", async () => {
    const response = await request(app)
      .get("/greet/v1/blog")
      .set("Authorization", `Bearer ${authtoken}`);
    expect(response.status).toBe(200);
  });
  it("PUT /greet/v1/blog/:id  should update blog", async () => {
    let brand = {
      title: "online shopping",
      message: "admin",
      image: "fashion",
    };
    const response = await request(app)
      .put("/greet/v1/blog/${blogId}")
      .send(Blog)
      .set("Authorization", `Bearer ${authtoken}`);
    expect(response.status).toBe(200);
  });
  it("DELETE should delete the specified blog", async () => {
    const response = await request(app)
      .delete("/greet/v1/blog/${blogId}")
      .set("Authorization", `Bearer ${authtoken}`);
    expect(response.status).toBe(200);
  });
  it("DELETE should delete all blogs", async () => {
    const response = await request(app)
      .delete("/greet/v1/blog")
      .set("Authorization", `Bearer ${authtoken}`);
    expect(response.status).toEqual(200);
  });
});
