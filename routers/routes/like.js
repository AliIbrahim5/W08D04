const express = require('express')
const  { likeAndDelet} = require('./../controllers/like')
const likeRouter = express.Router()
const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");


likeRouter.delete("/like/:id",authentication, likeAndDelet);


module.exports = likeRouter;