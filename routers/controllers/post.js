const postmodel = require("../../db/models/post");
// انشاء بوست جديد
const newPost = (req, res) => {
  const { img, desc ,user} = req.body;
  // const { _id } = req.params;
  try {
    const newPost = new postmodel({
      img,
      desc,
      time: Date(),
      user,
    });
    newPost
      .save()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(200).send(err);
      });
  } catch (error) {
    res.status(200).send(error);
  }
};

// تعديل على البوست عن طريق سوفت ديليت
const softDel = (req, res) => {
  const { _id } = req.params;
  try {
    postmodel.findOne({ _id: _id }).then((item) => {
      
      if (item.user == req.token._id) {
        postmodel.findById({ _id: _id }).then((item) => {
          if (item.isDel == false) {
            postmodel
              .findByIdAndUpdate(
                { _id: _id },
                { $set: { isDel: true } },
                { new: true }
              )
              .then((result) => {
                res.status(200).json(result);
              })
              .catch((err) => {
                res.status(400).json(err);
              });
          } else {
            postmodel
              .findByIdAndUpdate(
                { _id: _id },
                { $set: { isDel: false } },
                { new: true }
              )
              .then((result) => {
                res.status(200).json(result);
              })
              .catch((err) => {
                res.status(400).json(err);
              });
          }
        });
      } else if (req.token.role == "61a734cd947e8eba47efbc68") {
        postmodel.findById({ _id: _id }).then((item) => {
          if (item.isDel == false) {
            postmodel
              .findByIdAndUpdate(
                { _id: _id },
                { $set: { isDel: true } },
                { new: true }
              )
              .then((result) => {
                res.status(200).json(result);
              })
              .catch((err) => {
                res.status(400).json(err);
              });
          } else {
            postmodel
              .findByIdAndUpdate(
                { _id: _id },
                { $set: { isDel: false } },
                { new: true }
              )
              .then((result) => {
                res.status(200).json(result);
              })
              .catch((err) => {
                res.status(400).json(err);
              });
          }
        });
      } else {
        res.status(403).send("Forbidden");
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

// التعديل على البوست
const updatePost = (req, res) => {
  const { _id } = req.params;
  const { desc } = req.body;
  try {
    postmodel.findOne({ _id: _id }).then((item) => {
      // console.log("Update token ", req.token);
      if (item.user == req.token._id) {
        postmodel
          .findOneAndUpdate(
            { _id: _id },
            { $set: { desc: desc, time: Date() } },
            { new: true }
          )
          .then((result) => {
            res.status(200).json(result);
          });
      } else if (req.token.role == "61a734cd947e8eba47efbc68") {
        postmodel
          .findOneAndUpdate(
            { _id: _id },
            { $set: { desc: desc, time: Date() } },
            { new: true }
          )
          .then((result) => {
            res.status(200).json(result);
          });
      } else {
        res.status(403).send("forbbiden");
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

// اظهار كل البوستات لليوزر
const geAllPost = (req, res) => {
  try {
    postmodel.find({ isDel: false }).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const getPost = (req, res) => {
  const { _id } = req.params;
  try {
    postmodel.findOne({ _id: _id }).then((result) => {
      if (result.isDel == false) {
        res.status(200).json(result);
      } else {
        res.status(404).send("Post deleted");
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
// حذف الكومنت من البوست
const deleteCommentOwner = (req, res) => {
  const { postId, commentId } = req.params;
  try {
    postModel.findOne({ _id: postId }).then((item) => {
      if (item) {
        if (item.user == req.token._id) {
          commentModel.findOneAndDelete({ _id: commentId }).then((result) => {
            if (result) {
              res.status(200).send("Delete comment succefullty");
            } else {
              res.status(404).send("Comment not found");
            }
          });
        } else {
          res.status(403).send("Forbidden");
        }
      } else {
        res.status(404).send("Post not found");
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  newPost,
  softDel,
  updatePost,
  geAllPost,
  getPost,
  deleteCommentOwner,
};
