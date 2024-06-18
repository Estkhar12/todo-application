import express from "express";
import mongoose from "mongoose";
import userRoute from "./src/routes/user.js";
import todoRoute from "./src/routes/todo.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/todo", todoRoute);

mongoose.connect(process.env.MONGODB);

const port = 3000;

app.listen(port, () => {
  console.log(`server is running on ${port}..`);
});
