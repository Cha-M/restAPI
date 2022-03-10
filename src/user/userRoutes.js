const { Router } = require("express");
const { addUser, login, updatePassword, deleteUser, listUsers } = require("./userControllers");
const { hashPassword, decryptPassword, checkToken } = require("../middleware");
const userRouter = Router();

userRouter.post("/user", hashPassword, addUser);
userRouter.post("/login", decryptPassword, login);
userRouter.get("/user", checkToken, login);
userRouter.patch("/user", hashPassword, checkToken, updatePassword);
//movieRouter.delete("/movie/:filterKey/:filterVal", deleteMovie);
userRouter.delete("/user/:filterKey/:filterVal", checkToken, deleteUser);
userRouter.get("/list", listUsers);

//targeting the endpoint
//can't have two posts on /user

module.exports = userRouter;
