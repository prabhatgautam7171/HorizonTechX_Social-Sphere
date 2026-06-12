import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from './routes/authRoute.js'
import postRoute from "./routes/postRoute.js";
import commentRoute from "./routes/commentRoute.js";
import userRoute from "./routes/userRoute.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


// routes
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);
app.use("/api/users", userRoute);


// mongodb connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


// server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
