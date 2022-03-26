import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import userRouter from "./routes/user.js"; 
const app = express();
dotenv.config();


app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user",userRouter);

app.get("/", (req, res) => {
  res.send("Hello to my memories API");
});
//const CONNECTION_URL =  "mongodb+srv://pro-memory:pro-memory123@cluster0.kl6wa.mongodb.net/postmessages";
const PORT = process.env.PORT || 7000;

mongoose
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`))
  )
  .catch((error) => console.log(`${error} did not connect`));

// mongoose.set('useFindAndModify', false);
