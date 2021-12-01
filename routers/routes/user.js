const express = require("express");
const userRoute = express.Router();


const {
  resgister,
  login,
  getalluser,
  deletuser,
} = require("./../controllers/user");
const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");


userRoute.post("/resgister", resgister);
userRoute.post("/login", login);
userRoute.get("/allusers", authentication, authorization, getalluser);
userRoute.delete("/userdelet/:_id", authentication, authorization, deletuser);

module.exports = userRoute;
