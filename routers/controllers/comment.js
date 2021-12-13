
// ريكواير لجميع المودل المرتبطة في الكومنت
const commentModel = require("../../db/models/comment");
const postModel = require("../../db/models/post");
const likeModel = require("../../db/models/like");
// كتابة تعليق جديد
const newComment = (req, res) => {
  const { id } = req.params;
  const { desc, user } = req.body;
console.log(id);
  const newComment = new commentModel({
    desc,
    user: user,
    post: id,
  });
  newComment
    .save()
    .then((result) => {
      postModel
        .findByIdAndUpdate(id, { $push: { desc: result._id } })
        .then((result) => {
          console.log(result);
        });
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// لحذف التعليق 
const deleteCommet = (req, res) => {
  const { _id } = req.params;
  try {
    commentModel.findOne({ _id: _id }).then((item) => {
      if (item) {
        if (item.user == req.token._id) {
          commentModel
            .findOneAndDelete({ _id: _id })
            .then((result) => {
              if (result) {
                res.status(200).json(result);
              } else {
                res.status(404).send("Not found");
              }
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        } else if (req.token.role == "61a734cd947e8eba47efbc68") {
          commentModel
            .findOneAndDelete({ _id: _id })
            .then((result) => {
              if (result) {
                res.status(200).json(result);
              } else {
                res.status(404).send("Not found");
              }
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        } else {
          res.status(403).send("Forbidden");
        }
      } else {
        res.status(404).send("Not found");
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
// التعديل على التعليق 
const updateComment = (req, res) => {
  const { _id } = req.params;
  const { desc } = req.body;
  try {
    commentModel.findOne({ _id: _id }).then((item) => {
      console.log(req.token);
      if (item.user == req.token._id) {
        commentModel
          .findOneAndUpdate(
            { _id: _id },
            { $set: { desc: desc, time: Date() } },
            { new: true }
          )
          .then((result) => {
            if (result) {
              res.status(200).json(result);
            } else {
              res.status(404).send("Comment not found");
            }
          });
      } else if (req.token.role == "61a734cd947e8eba47efbc68") {
        commentModel
          .findOneAndUpdate(
            { _id: _id },
            { $set: { desc: desc, time: Date() } },
            { new: true }
          )
          .then((result) => {
            if (result) {
              res.status(200).json(result);
            } else {
              res.status(404).send("Comment not found");
            }
          });
      } else {
        res.status(404).send("Forbidden");
      }
    });
  } catch (error) {
    res.status(404).json(error);
  }
};
// اظهار التعليق 
const getComment = (req, res) => {
  const { id } = req.params;
  const { desc, username } = req.body;

  const newComment = new commentModel({
    desc,
    user: username,
    post: id,
  });
  newComment
    .save()
    .then((result) => {
      postModel
        .findByIdAndUpdate(id, { $push: { comment: result._id } })
        .then((result) => {
          console.log(result);
        });
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
// اظهار البوست مع الكومنت
const getPostWithComments = (req, res) => {
  const { _id } = req.params;
  try {
    let test = [];
    postModel.findOne({ _id: _id }).then((item) => {
      if (item.isDel == false) {
        test.push(item);
        commentModel.find({ post: _id }).then((result) => {
          test.push(result);
          likeModel.find({ post: _id }).then((ele) => {
            test.push(ele);

            res.status(200).json(test);
          });
        });
      } else {
        res.status(404).json("Post is deleted");
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  newComment,
  deleteCommet,
  updateComment,
  getComment,
  getPostWithComments,
};
