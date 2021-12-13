const express = require("express");
const likeRouter = express.Router();

const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");

const { newLike } = require("../controllers/like");
// عمل لايك للببوست عن طريق ايدي اليوزر و والبوست
likeRouter.post("/like/:id", newLike);

module.exports = likeRouter;