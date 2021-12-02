
const express = require("express");

const roleRouter = express.Router();

const { newrolr, getrole } = require("../controllers/role");

const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");
// انشاء صلاحيات جديدة 
roleRouter.post("/role",authentication,authorization,newrolr);
// اظهار جيمع الصلاحيات
roleRouter.get("/read" ,authentication,authorization,getrole);

module.exports = roleRouter;
