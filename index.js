// ريكواير لبناء السيرفر عبر الاكسبريس
const express = require("express");
// دوت انف لأستدعاء ملف env
const dotenv = require("dotenv");
// الكورس تستخدم في حال ربط الباك مع الفرونت
const cors = require("cors");
//  لتعريف الاكسبريس ونستخدم qpp باكت براكتس
const app = express();
// تعمل مثل عمل التشغيل 
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:3000", 
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// استدعاء ملف الدي بي الى الاندكس
const db = require("./db/index");

const flash = require("connect-flash");
const session = require('express-session');
const passport = require('passport');
app.use(express.json());

require('./config/passport')(passport);
app.use(
  session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use(express.urlencoded({ extended: false }))
// استدعاء الرfول للاندكس عن طريق مجلد الروتز
const roleRouter = require("./routers/routes/role");

// استدعاء اليوزر عن طريق ملف اليوزر من مجلد الروتز
const userRoute = require("./routers/routes/user");
// استدعاء البوست عن طريق ملف البوست من مجلد الروتز
const postsRouter = require("./routers/routes/post");
// استدعاء ملف لايك من مجلد الروتز
const likeRouter = require("./routers/routes/like");
const commentRouter = require("./routers/routes/comment");
// لتشغيل الرول 
app.use(roleRouter);
app.use(commentRouter);
// لتشغيل اليوزر
app.use(userRoute);
// لتشغيل البوست
app.use(postsRouter);
// لتشغيل لايك
app.use(likeRouter);
// جلب البورت من  .env  ||  5000وفي حال لم يشتغل نضع     
const PORT = process.env.PORT || 5000;


// لمعرفة مااذا كان السيرفر شغال او لا
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
