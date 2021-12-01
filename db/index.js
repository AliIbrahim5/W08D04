const mongoose = require("mongoose");

// عملت ريكواير لدونت انف لتخزيني الدي بي بداخلها
const dotenv = require("dotenv");
dotenv.config();
// استدعاء الداتا بيس من الدونت انف
const DB = process.env.DB;
// احفظها كما هي
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// التأكد من ان الداتا بيس شغاله
mongoose.connect(DB, options).then(
  () => {
    console.log("DB Ready To Use");
  },
  (err) => {
    console.log(err);
  }
);