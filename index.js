
const express = require("express");

const dotenv = require("dotenv");

const cors = require("cors");

const app = express();

dotenv.config();

const db = require("./db/index");
app.use(express.json());

// const roleRouter = require("./routers/routes/role");

// const userRoute = require("./routers/routes/user");

// const taskRouter = require("./routers/routes/task");

// app.use(roleRouter);

// app.use(userRoute);

// app.use(taskRouter);

const PORT = process.env.PORT || 5000;
app.use(cors());


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
