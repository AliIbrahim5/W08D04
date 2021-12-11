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
// استدعاء ملف الدي بي الى الاندكس
const db = require("./db/index");

app.use(express.json());
app.use(cors());
// استدعاء الرول للاندكس عن طريق مجلد الروتز
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
