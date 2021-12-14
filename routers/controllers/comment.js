
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
  const { id } = req.params;
  commentModel
    .findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        res.status(200).json("desc removed");
      } else {
        res.status(200).json("desc does not exist");
      }
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};
  
// التعديل على التعليق 
const updateComment = (req, res) => {
  const { id } = req.params;
  const { desc } = req.body;
    commentModel
      .findByIdAndUpdate(id, { $set: { desc: desc } })
      .then((result) => {
        if (result) {
          res.status(200).json("desc updated");
        } else {
          res.status(404).json("desc does not exist");
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
};

// اظهار التعليق 
const getComment = (req, res) => {
  commentModel.find({ post: req.body.post }).populate('user')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
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
