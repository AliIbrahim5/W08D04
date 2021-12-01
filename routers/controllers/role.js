
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
