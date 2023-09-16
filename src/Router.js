const rt = require("express").Router();
const multer = require("multer");

//\/\/\ Router for user /\/\/\
const user = require("./Controller/user.control");
const uv = require("./Validation/user.validation");
const userImg = multer().single("user-img");

rt.post("/signup", uv.signup, user.signup);
rt.post("/signin", uv.signin, user.signin);
rt.post("/update-user-img/:id", userImg, user.updateImg);
rt.patch("/update/user/:id", uv.updateUser, user.updateUser);

module.exports = rt;
