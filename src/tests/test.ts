import request from 'supertest';
import app from '../index';
import mongoose from 'mongoose';
require('dotenv').config();
import { User } from '../models/user';

let userId: string;
let blogId:string;
let email:string;
let commentId:string
beforeAll(async () => {
  await mongoose.connect(
    "mongodb+srv://sofidele12:Sophie1992@mukamugema.xgxanbg.mongodb.net/SALES"
  );
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("API Endpoints", () => {
  let authtoken: string;
  let blogId: string;
  let contactId:string;

  // users

  it("POST user should create a user", async () => {
    const user = {
      firstname: "firstname",
      lastname: "lastname",
      email: "email",
      role: "admin",
      password: "Sophie1992@",
    };
    const response = await request(app).post("/api/users").send(user);
    expect(response.status).toBe(200);
  });

  it("POST login should log in a user", async () => {
    const admin = {
      email: "m12@gmail.com",
      password: "PETER",
    };
    const response = await request(app).post("/api/users/login").send(admin);
    expect(response.status).toBe(200);
    authtoken = response.body.token;
    expect(authtoken).toBeTruthy();
  });
  it("GET should return a list of users", async () => {
    const response = await request(app)
      .get("/api/users/profile")
      .set("Authorization", authtoken);
    expect(response.status).toBe(200);
  });
  
  it("PUT should not update user if user is not found", async () => {
    let user = {
   
      email:"manzi12@gmail.com",
      password:"PETER"
      

    };
    const response = await request(app)
      .put(`/api/users/profile/${userId}`)
      .send(user)
      .set("Authorization", authtoken);
    expect(response.status).toBe(404);
  });
  it("DELETE should delete the specified user", async () => {
    const response = await request(app)
      .delete(`/api/users/profile/${userId}`)
      .set("auth-token", authtoken);

    expect(response.status).toBe(500);
  });

  // blogs

  it("POST blog should create a new blog", async () => {
    let blog = {
      title: "Rwandans",
      message: "Rwandans are beautifull",
      image: "",
    };

    // const dotPathfile =`${__dirname}/image/image.jpg` ;
    // console.log(dotPathfile)
    const response = await request(app)

      .post("/api/blogs")
      .send(blog)
      // .set("auth-token", authtoken)
      .set('contentType', 'application/octet-stream')
      // .field('title',"RWANDA")
      // .field('message',"message")
      // .attach('image',dotPathfile)
     
   
    expect(response.status).toBe(200);
    blogId = response.body.data._id;
  });

  it("GET should return a list of blogs", async () => {
    const response = await request(app)
      .get("/api/blogs")
      .set("auth-token", authtoken);
    expect(response.status).toBe(200);
  });

  it("GET  should return a specific blog with id", async () => {
    const response = await request(app)
      .get("/api/blogs")
      .set("auth-token", authtoken);
    expect(response.status).toBe(200);
  });

  it("PUT blog should update blog", async () => {
    let blog = {
      title: "online shopping",
      message: "admin",
      image: "fashion",
    };
    const response = await request(app)
      .put(`/api/blogs/${blogId}`)
      .set("auth-token", authtoken)
      .send(blog);

    expect(response.status).toBe(200);
  });

  it("DELETE should delete the specified blog", async () => {
    const response = await request(app)
      .delete(`/api/blogs/${blogId}/comments`)
      .set("auth-token", authtoken);
      console.log(authtoken)
     console.log(blogId)
    expect(response.status).toBe(200);
  });

  // comments


  it("GET should return a list of comments", async () => {
    const response = await request(app)
      .get(`/api/blogs/${blogId}/comments`)
      .set("auth-token", authtoken);
    expect(response.status).toBe(200);
  });
  it("DELETE should delete the specified comment", async () => {
    const response = await request(app)
      .delete(`/api/blogs/${blogId}/comments`)
      .set("auth-token", authtoken);
    expect(response.status).toBe(200);
  });
  // it("PUT/comment should update comment", async () => {
  //   let comment = {
  //     message: "admin",  
  //   };
  //   const response = await request(app)
  //     .put(`/greet/v1/blog/${commentId}`)
  //     .set("auth-token", authtoken)
  //     .send(comment);
  // });

  // Contacts

  it("GET should return a list of contacts", async () => {
    const response = await request(app)
      .get("/api/contacts")
      .set("auth-token", authtoken);
    expect(response.status).toBe(200);
  });
  it("DELETE should delete the specified contact", async () => {
    const response = await request(app)
      .delete(`/api/contacts/messages/${contactId}`)
      .set("auth-token", authtoken);
    expect(response.status).toBe(500);
  });
  // it("PUT/contact should update contact", async () => {
  //   let contact = {
  //     message: "admin",  
  //   };
  //   const response = await request(app)
  //     .put(`/api/contact${contactId}`)
  //     .set("auth-token", authtoken)
  //     .send(contact);
  // });


  it("POST contact should create a new contact", async () => {
    let contact = {
      name:"brian",
      email:"brian@gmail.com",
      message: "Rwandans are beautifull"
    };
    const response = await request(app)
      .post(`/api/contacts/messages`).send(contact)
      .set("Authorization", authtoken);
    expect(response.status).toBe(200);

  });



  // This route doesn't exist
  // it("DELETE should delete all blogs", async () => {
  //   const response = await request(app)
  //     .delete("/greet/v1/blog")
  //     .set("Authorization", `Bearer ${authtoken}`);
  //   expect(response.status).toEqual(200);
  // });
});
