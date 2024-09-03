import express from "express";
import { mongodbURL, PORT } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoutes from "./routes/bookRoutes.js";
import cors from 'cors';

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS policy
//Option 1: Allow all origins with Default of CORS (*)
app.use(cors())

//Option 2: Allow custom origins

// app.use(cors({
//   origin:'http://localhost:3000',
//   methods: ['GET','POST','PUT','DELETE'],
//   allowHeaders : ['Content-Type'],
// }))


app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to MERN Stack");
});

app.use("/books",bookRoutes);//app.use is used when middleware is used or it is used as middleware

mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("Connection Success");
    app.listen(PORT, () => {
        console.log(`App is listening to Port :${PORT}`);
      });
  })
  .catch((error) => {
    console.log(error);
  });
