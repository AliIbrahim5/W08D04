
const express = require("express");

const roleRouter = express.Router();

const { newrolr, getrole } = require("../controllers/role");

const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");

roleRouter.post("/role",newrolr);
roleRouter.get("/read",getrole);

module.exports = roleRouter;
