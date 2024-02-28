import request from 'supertest';
import app from '../index'; // Assuming your Express app is exported from app.js
import mongoose from 'mongoose'; // Assuming you're using Mongoose

require('dotenv').config();

// /* Connecting to the database before each test. */
// beforeAll(async () => {
//     await mongoose.connect("mongodb+srv://sofidele12:Sophie1992@mukamugema.xgxanbg.mongodb.net/SALES");
// });

// /* Closing database connection after each test. */
// afterAll(async () => {
//     await mongoose.connection.close();
// });

// describe('User Endpoints', () => {
//    // Variable to store the ID of the created user
    
//     // Test case for creating a user
//     it('should create a new user', async () => {
//         const user = {
//             firstname:'Sophie',
//             lastname: 'mukamugema',
//             email: 'sofidele12@gmail.com',
//             password: 'Sophie',
//             role:'admin'
//         };

//         const response = await request(app)
//             .post('/greet/v1/user')
//             .send(user);

//         expect(response.status).toBe(200);
//         expect(response.body).toHaveProperty('_id');
//         // Store the ID of the created user for later use
//     });

//     // Test case for retrieving a user by ID
//     it('should retrieve a user by ID', async () => {
//         const response = await request(app).get(`/api/user/id`);

//         expect(response.status).toBe(200);
//         expect(response.body).toHaveProperty('password', 'testuser');
//     });

//     // Test case for updating a user by ID
//     it('should update a user by ID', async () => {
//         const updatedUserData = {
//             username: 'updateduser',
//             email: 'updateduser@example.com'
//         };

//         const response = await request(app)
//             .put(`/api/user/id`)
//             .send(updatedUserData);

//         expect(response.status).toBe(200);
//         expect(response.body).toHaveProperty('username', 'updateduser');
//         expect(response.body).toHaveProperty('email', 'updateduser@example.com');
//     });

//     // Test case for deleting a user by ID
//     it('should delete a user by ID', async () => {
//         const response = await request(app).delete(`/api/user/id`);

//         expect(response.status).toBe(204); // Assuming your API returns 204 for successful deletion
//     });
// });

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
