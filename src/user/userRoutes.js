const { Router } = require("express");
const { addUser, login} = require("./userControllers");
const { hashPassword, decryptPassword, checkToken } = require("../middleware");
const userRouter = Router();

userRouter.post("/user", hashPassword, addUser);
userRouter.post("/login", decryptPassword, login);
userRouter.get("/user", checkToken, login);

//targeting the endpoint
//can't have two posts on /user

module.exports = userRouter;
