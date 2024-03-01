"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const usercontroller_1 = __importDefault(require("./controller/usercontroller"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.status(200).send({ message: "Welcome to our first API" });
});
app.get("/", usercontroller_1.default.getUsers);
app.get("/:id", usercontroller_1.default.getUser);
app.post("/", usercontroller_1.default.createUser);
app.put("/:id", usercontroller_1.default.updateUser);
app.delete("/:id", usercontroller_1.default.deleteUser);
app.post("/login", usercontroller_1.default.login);
app.delete("/", usercontroller_1.default.deleteUsers);
// // blogs endpoints
// app.post('/create', blogController.createBlog);
// app.get('/', blogController.getBlog);
// app.get('/get', blogController.getAllBlogs);
// app.delete('/', blogController.deleteBlog);
// app.delete('/delete', blogController.deleteAllBlogs);
// app.patch('/', blogController.updateBlog)
exports.default = app;
