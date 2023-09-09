const rt = require("express").Router();

//\/\/\ Router for user /\/\/\
const user = require("./Controller/user.control");
const uv = require("./Validation/user.validation");
rt.post("/signup", uv.signup, user.signup);
rt.post("/signin", uv.signin, user.signin);

module.exports = rt;
