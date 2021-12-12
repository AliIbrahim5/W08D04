const express = require("express");
const postRouter = express.Router();
const {authentication} = require("../../config/checkAuth");
const {
  newPost,
  softDel,
  updatePost,
  geAllPost,
  getPost,
  deleteCommentOwner
} = require("../controllers/post");
// اظهار البوست
postRouter.get("/post/:_id", getPost);
// اظهار جميع البوستات
postRouter.get("/allPost", authentication, geAllPost);
// التعديل على البوست
postRouter.put("/updatePost/:_id", authentication, updatePost);
// انشاء بوست جديد
postRouter.post("/newPost/:_id", authentication, newPost);
// عمل سوفت دليت للبوست
postRouter.put("/softDelete/:_id",authentication, softDel);
// صاحب الحساب يحذف الكومنت 
postRouter.delete("/ownerDelteComment/:postId/:commentId", authentication, deleteCommentOwner );

module.exports = postRouter;
