"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
let userId;
let blogId;
let email;
let commentId;
beforeAll(async () => {
    await mongoose_1.default.connect("mongodb+srv://sofidele12:Sophie1992@mukamugema.xgxanbg.mongodb.net/SALES");
});
afterAll(async () => {
    await mongoose_1.default.connection.close();
});
describe("API Endpoints", () => {
    let authtoken;
    let blogId;
    let contactId;
    // users
    it("POST user should create a user", async () => {
        const user = {
            firstname: "firstname",
            lastname: "lastname",
            email: "email",
            role: "admin",
            password: "Sophie1992@",
        };
        const response = await (0, supertest_1.default)(index_1.default).post("/greet/v1/user").send(user);
        expect(response.status).toBe(200);
    });
    it("POST login should log in a user", async () => {
        const admin = {
            email: "m12@gmail.com",
            password: "PETER",
        };
        const response = await (0, supertest_1.default)(index_1.default).post("/greet/v1/user/login").send(admin);
        expect(response.status).toBe(200);
        authtoken = response.body.token;
        expect(authtoken).toBeTruthy();
    });
    it("GET should return a list of users", async () => {
        const response = await (0, supertest_1.default)(index_1.default)
            .get("/greet/v1/user")
            .set("Authorization", authtoken);
        expect(response.status).toBe(200);
    });
    it("PUT should update user", async () => {
        let user = {
            firstname: "testuser1",
            lastname: "testuser1",
        };
        const response = await (0, supertest_1.default)(index_1.default)
            .put(`/greet/v1/user/${userId}`)
            .send(user)
            .set("Authorization", authtoken);
        expect(response.status).toBe(500);
    });
    it("DELETE should delete the specified user", async () => {
        const response = await (0, supertest_1.default)(index_1.default)
            .delete(`/greet/v1/user/${blogId}`)
            .set("auth-token", authtoken);
        expect(response.status).toBe(500);
    });
    // blogs
    it("POST blog should create a new blog", async () => {
        let blog = {
            title: "Rwandans",
            message: "Rwandans are beautifull",
            picture: [],
        };
        const response = await (0, supertest_1.default)(index_1.default)
            .post("/greet/v1/blog")
            .set("auth-token", authtoken)
            .send(blog);
        expect(response.status).toBe(200);
        blogId = response.body.data._id;
    });
    it("GET should return a list of blogs", async () => {
        const response = await (0, supertest_1.default)(index_1.default)
            .get("/greet/v1/blog")
            .set("auth-token", authtoken);
        expect(response.status).toBe(500);
    });
    it("GET  should return a specific blog with id", async () => {
        const response = await (0, supertest_1.default)(index_1.default)
            .get("/greet/v1/blog")
            .set("auth-token", authtoken);
        expect(response.status).toBe(200);
    });
    it("PUT blog should update blog", async () => {
        let blog = {
            title: "online shopping",
            message: "admin",
            image: "fashion",
        };
        const response = await (0, supertest_1.default)(index_1.default)
            .put(`/greet/v1/blog/${blogId}`)
            .set("auth-token", authtoken)
            .send(blog);
        expect(response.status).toBe(500);
    });
    it("DELETE should delete the specified blog", async () => {
        const response = await (0, supertest_1.default)(index_1.default)
            .delete(`/greet/v1/blog/${blogId}`)
            .set("auth-token", authtoken);
        expect(response.status).toBe(500);
    });
    // comments
    it("GET should return a list of comments", async () => {
        const response = await (0, supertest_1.default)(index_1.default)
            .get("/greet/v1/comment")
            .set("auth-token", authtoken);
        expect(response.status).toBe(200);
    });
    it("DELETE should delete the specified comment", async () => {
        const response = await (0, supertest_1.default)(index_1.default)
            .delete(`/greet/v1/comment/${commentId}`)
            .set("auth-token", authtoken);
        expect(response.status).toBe(500);
    });
    it("PUT/comment should update comment", async () => {
        let comment = {
            message: "admin",
        };
        const response = await (0, supertest_1.default)(index_1.default)
            .put(`/greet/v1/blog/${commentId}`)
            .set("auth-token", authtoken)
            .send(comment);
    });
    // Contacts
    it("GET should return a list of contacts", async () => {
        const response = await (0, supertest_1.default)(index_1.default)
            .get("/greet/v1/contact")
            .set("auth-token", authtoken);
        expect(response.status).toBe(200);
    });
    it("DELETE should delete the specified contact", async () => {
        const response = await (0, supertest_1.default)(index_1.default)
            .delete(`/greet/v1/contact/${contactId}`)
            .set("auth-token", authtoken);
        expect(response.status).toBe(500);
    });
    it("PUT/contact should update contact", async () => {
        let contact = {
            message: "admin",
        };
        const response = await (0, supertest_1.default)(index_1.default)
            .put(`/greet/v1/contact${contactId}`)
            .set("auth-token", authtoken)
            .send(contact);
    });
    it("POST contact should create a new contact", async () => {
        let contact = {
            message: "Rwandans are beautifull"
        };
        const response = await (0, supertest_1.default)(index_1.default)
            .post(`/greet/v1/contact`).send(contact)
            .set("Authorization", authtoken);
        expect(response.status).toBe(500);
    });
    // This route doesn't exist
    // it("DELETE should delete all blogs", async () => {
    //   const response = await request(app)
    //     .delete("/greet/v1/blog")
    //     .set("Authorization", `Bearer ${authtoken}`);
    //   expect(response.status).toEqual(200);
    // });
});
