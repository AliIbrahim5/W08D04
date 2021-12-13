const express = require("express");
const userRoute = express.Router();


const {
  resgister,
  login,
  getalluser,
  deletuser,
  resetPassword,
  activate,
  logout,
    gotoReset,
  forgotPassword,
} = require("./../controllers/user");
// const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");
const {authentication} = require("../../config/checkAuth");

// تسجيل حساب جديد
userRoute.post("/resgister", resgister);
// تسجيل دخول 
userRoute.post("/login", login);
// اظهار جميع الحسابات للادمن
userRoute.get("/allusers",  getalluser);
// حذف الحساب المراد عن طريق ايدي الحسابs للادمن
userRoute.delete("/userdelet/:_id", authentication, authorization, deletuser);
userRoute.get("/login/err", (req,res)=>res.json({err: 'Incorrect Email/Password'}));
userRoute.get("/login/success", (req,res)=>res.json({success: 'success'}));
userRoute.get('/activate/:token', activate);
userRoute.post('/forgott', forgotPassword);
userRoute.get('/forgot/:token', gotoReset);
userRoute.get('/logout', logout);
userRoute.post('/reset/:id', resetPassword);
userRoute.get("/user", (req, res) => {
  if (req.user) {
      res.json({user:req.user});
  }else{
    res.json('no user');
  }
 
});
module.exports = userRoute;
