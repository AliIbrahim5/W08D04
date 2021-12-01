const likeModel = require("../../db/models/like");
const roleModel = require("../../db/models/role");


const likeAndDelet = async(req, res) => {
    const { id } = req.params;
    const { like } = req.body;
    let sameUser = false;
  
    likeModel.findOne({ _id: id, user: req.token.id }).then((result) => {
      console.log(result);
      if (result) {
        sameUser = true;
        console.log(sameUser);
      }
    });
  
    const result = await roleModel.findById(req.token.role);
  
   
    if (result.role == "admin" || sameUser) {
      postModel
        .findByIdAndUpdate(id, { $set: { desc: desc, img: img } })
        .then((result) => {
          if (result) {
            res.status(200).json("post updated");
          } else {
            res.status(404).json("post does not exist");
          }
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    } else {
      res.json("you don't have the priveleges to update the post");
    }
  };

  module.exports = {  likeAndDelet};