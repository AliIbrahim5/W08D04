

const express = require("express");
const commentRouter = express.Router();
// const authentication = require("./../middleware/authentication");
// const authorization = require("./../middleware/authorization");
const {authentication} = require("../../config/checkAuth")

const {
  newComment,
  deleteCommet,
  updateComment,
  getComment,
  getPostWithComments
} = require("../controllers/comment");
// باث التعليق الجديد عن طريق ايدي اليوزر و ايدي البوست
commentRouter.post("/newComment/:id", newComment);
// حذف تعليق عن طريق ايدي التعليق 
commentRouter.delete("/deletecomment/:id", authentication, deleteCommet);
// التعديل على التعليق عن طريق الايدي
commentRouter.put("/updatecomment/:id", authentication, updateComment);
commentRouter.post("/getComment", getComment);
// اظهار اللايك عن طريق البوست والكومنتات بستخدام ايدي البوست
commentRouter.get("/getPostWithComments/:_id", getPostWithComments);

module.exports = commentRouter;