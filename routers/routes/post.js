const express = require("express");
const postRouter = express.Router();
const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");

const {
  newPost,
  softDel,
  updatePost,
  geAllPost,
  getPost,
  deleteCommentOwner
} = require("../controllers/post");

postRouter.get("/post/:_id", getPost);
postRouter.get("/allPost", authentication, authorization, geAllPost);
postRouter.put("/updatePost/:_id", authentication, updatePost);
postRouter.post("/newPost/:_id", authentication, newPost);
postRouter.put("/softDelete/:_id",authentication, softDel);
postRouter.delete("/ownerDelteComment/:postId/:commentId", authentication, deleteCommentOwner );

module.exports = postRouter;
