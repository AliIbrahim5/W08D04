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

// تسجيل حساب جديد
userRoute.post("/resgister", resgister);
// تسجيل دخول 
userRoute.post("/login", login);
// اظهار جميع الحسابات للادمن
userRoute.get("/allusers",  getalluser);
// حذف الحساب المراد عن طريق ايدي الحساب للادمن
userRoute.delete("/userdelet/:_id", authentication, authorization, deletuser);

module.exports = userRoute;
