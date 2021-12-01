const rolemodel = require("../../db/models/role");
// انشاء رول جديد اما ان يكون ادمن او يوزر 
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
//  تظهتر الصلاحيات للادمن واليوزر
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
