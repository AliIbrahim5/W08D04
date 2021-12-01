const usermodel = require("../../db/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt = Number(process.env.SALT);
const secret = process.env.SECRET;
const resgister = async (req, res) => {
  const { email, password, role } = req.body;

  const savedEmail = email.toLowerCase();
  const savedPassword = await bcrypt.hash(password, salt);

  const newuser = new usermodel({
    email: savedEmail,
    password: savedPassword,
    role,
  });
  newuser
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};


const login = (req, res) => {
  const { email, password } = req.body;
  const savedEmail = email.toLowerCase();

  usermodel
    .findOne({ email: savedEmail })

    .then(async (result) => {
      if (result) {
        if (result.email == email) {
          const savedPassword = await bcrypt.compare(password, result.password);
          const payload = {
            role: result.role,
            id: result._id,
          };

          if (savedPassword) {
            let token = jwt.sign(payload, secret);
            res.status(200).json({ result, token });
          } else {
            res.status(400).json("Wrong email or password");
          }
        } else {
          res.status(400).json("Wrong email or password");
        }
      } else {
        res.status(404).json("Email not exist");
      }
    })
    .catch((err) => {
      res.send(err);
    });
};

const getalluser = (req, res) => {
  usermodel
    .find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};
const deletuser = (req, res) => {
  const { _id } = req.params;
  taskmodel
    .findByIdAndDelete({ _id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = { resgister, login, getalluser, deletuser };
