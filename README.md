# W08D04
## The packages used
1- npm i express (To build a backend server)

2- npm i cors (The benefit in it when using Front End)

3- npm i dotenv (To hide some sensitive things)

4- npm i jsonwebtoken (It contains 3 items and can only be changed on paylad)

5- npm i mongoose (To create the database)

6- npm i bcrypt (Password encryption)

7- npm i nodmone (globe)
## models-role


const mongoose = require("mongoose");


const role = new mongoose.Schema({
  role: { type: String },
  permossion: { type: Array },
});

module.exports = mongoose.model("Role", role);

## models-like

const mongoose = require("mongoose");


const role = new mongoose.Schema({
  like: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});


module.exports = mongoose.model("Like", role);

## models-post

const mongoose = require("mongoose");

const post = new mongoose.Schema({
  img: { type: String },
  desc: { type: String, required: true  },
  time: {type: Date},
  isDelet: { type: Boolean, default: false },
  isLik: { type: mongoose.Schema.Types.ObjectId, ref: "Like" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
},
{timestamps: true}
);

module.exports = mongoose.model("Post", post);

## models-comment

const mongoose = require("mongoose");


const comment = new mongoose.Schema({
  comment: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
},
{timestamps: true}
);


module.exports = mongoose.model("Comment", comment);

## models-user

const mongoose = require("mongoose");

const user = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, require: true },
  img: { type: String },
  isDelet: { type: Boolean, default: false },
  role: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
});


module.exports = mongoose.model("User", user);

## models-index

const mongoose = require("mongoose");


const dotenv = require("dotenv");
dotenv.config();

const DB = process.env.DB;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(DB, options).then(
  () => {
    console.log("DB Ready To Use");
  },
  (err) => {
    console.log(err);
  }
);

## routers-controllers-role

const rolemodel = require("../../db/models/role");

const newrolr = (req, res) => {
  const { role, permossion } = req.body;

  const newrolr = new rolemodel({
    role,
    permossion,
  });
  newrolr
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(err);
    });
};

const getrole = (req, res) => {
  rolemodel
    .find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = { newrolr, getrole };

## routers-controllers-like
const likeModel = require("../../db/models/like");

// Toggle like
const newLike = (req, res) => {
  const { userId, postId } = req.params;
  try {
    likeModel
      .findOneAndDelete({ $and: [{ post: postId }, { user: userId }] })
      .then((item) => {
        if (item) {
          res.status(200).send("like deleted");
        } else {
          const newLike = new likeModel({
            user: userId,
            post: postId,
          });
          newLike
            .save()
            .then((result) => {
              res.status(200).json(result);
            })
            .catch((err) => {
              res.status(400).send(err);
            });
        }
      });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { newLike };


## routers-controllers-post
const postmodel = require("../../db/models/post");


const newPost = (req, res) => {
  const { img, desc } = req.body;
  const { _id } = req.params;
  try {
    const newPost = new postmodel({
      img,
      desc,
      time: Date(),
      user: _id,
    });
    newPost
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

// soft delete post
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

// epdate post
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

// get post all
const geAllPost = (req, res) => {
  try {
    postmodel.find({ isDel: false }).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

// get post by id
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

module.exports = { newPost, softDel, updatePost, geAllPost, getPost };


## routers-controllers-comment
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


## routers-controllers-user




## routers-routes-role

## routers-routes-like


## routers-routes-post


## routers-routes-comment


## routers-routes-user


## index



