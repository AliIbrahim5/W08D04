const express = require("express");
const likeRouter = express.Router();

// const authentication = require("./../middleware/authentication");
// const authorization = require("./../middleware/authorization");
const {authentication} = require("../../config/checkAuth")

const { newLike } = require("../controllers/like");
// عمل لايك للببوست عن طريق ايدي اليوزر و والبوست
likeRouter.get("/like/:id",authentication, newLike);

module.exports = likeRouter;