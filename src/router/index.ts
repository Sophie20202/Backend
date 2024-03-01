import express, { Router } from "express";
import userRouter from "./userRouter";
import blogRouter from "./blogRouter";
import contactRouter from "./contactRouter";
import commentRouter from "./commentRouter"
// import loginRouter from "./loginRouter"
const router: Router = express.Router();

router.use("/user", userRouter  /*
#swagger.tags = ['USERS']
*/)
router.use("/blog", blogRouter  /*
#swagger.tags = ['BLOGS']
*/);
router.use("/contact",contactRouter  /*
#swagger.tags = ['CONTACTS']
*/)
router.use("/comment",commentRouter  /*
#swagger.tags = ['COMMENTS']
*/)

export default router;

