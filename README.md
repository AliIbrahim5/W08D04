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

## routers-controllers-like


## routers-controllers-post


## routers-controllers-comment


## routers-controllers-user




## routers-routes-role

## routers-routes-like


## routers-routes-post


## routers-routes-comment


## routers-routes-user


## index



