const express = require("express");
const likeRouter = express.Router();
const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");

const { newLike } = require("../controllers/like");

likeRouter.post("/like/:userId/:postId", newLike);

module.exports = likeRouter;