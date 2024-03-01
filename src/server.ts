import express, { Request, Response } from "express";
import bodyParser from "body-parser";

import Usercontroller from "./controller/usercontroller"
import Blogcontroller from "./controller/blogcontroller";
const app = express();

 

app.use(bodyParser.json());
app.get("/", (req: Request, res: Response) => {
    res.status(200).send({message: "Welcome to our first API"});
});
app.get("/", Usercontroller.getUsers);
app.get("/:id", Usercontroller.getUser);
app.post("/",Usercontroller.createUser);
app.put("/:id", Usercontroller.updateUser);
app.delete("/:id", Usercontroller.deleteUser);
app.post("/login",Usercontroller.login);
app.delete("/", Usercontroller.deleteUsers);


// // blogs endpoints
// app.post('/create', blogController.createBlog);
// app.get('/', blogController.getBlog);
// app.get('/get', blogController.getAllBlogs);
// app.delete('/', blogController.deleteBlog);
// app.delete('/delete', blogController.deleteAllBlogs);
// app.patch('/', blogController.updateBlog)
export default app;














