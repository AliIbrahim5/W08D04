const likeModel = require("../../db/models/like");

// وضع لايك على البوست عن طريق ايدي الويزر مع ايدي البوست
const newLike = (req, res) => {
  const { id } = req.params;
  likeModel
    .findOne({ user: req.token.id, post: id })
    .then((found) => {
      if (found) {
        //if liked before just change to opposite
        likeModel
          .deleteOne({ user: req.token.id, post: id }, { like: !found.like })
          .then(() => {
            res.status(201).json("like removed");
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      } else {
        //never been liked, do new like
        const newLike = new likeModel({
          like: true,
          user: req.token.id,
          post: id,
        });
        newLike
        .save()
        .then((result) => {
          postModel
            .findByIdAndUpdate(id, { $push: { like: result._id } })
            .then((result) => {
              console.log(result);
            });
          res.status(201).json(result);
        })
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};



module.exports = { newLike };
