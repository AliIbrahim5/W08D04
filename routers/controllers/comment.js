const commentModel = require("../../db/models/comment");
const postModel = require("../../db/models/post");
const likeModel = require("../../db/models/like");

const newComment = (req, res) => {
  const { desc } = req.body;
  const { userId, postId } = req.params;
  try {
    const newComment = new commentModel({
      desc,
      time: Date(),
      user: userId,
      post: postId,
    });
    newComment
      .save()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } catch (error) {
    res.status(400).send(error);
  }
};

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

const getComment = (req, res) => {
  const { _id } = req.params;
  try {
    commentModel.findOne({ _id: _id }).then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).send("Comment deleted");
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

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
