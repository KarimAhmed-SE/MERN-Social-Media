import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import registerRoutes from "../server/routes/registerRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import cookieParser from "cookie-parser";
import postRoutes from "./routes/post.js";
import userRoutes from "./routes/user.js";
import  jwt  from "jsonwebtoken";

// CONFIGURATIONS

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use("/public", express.static(__dirname + "/public"));

const connection = process.env.CONNECTION;

mongoose
  .connect(connection)
  .then(() => {
    console.log("App is connected to database!");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/logout", (req, res) => {
  //DON'T FORGET .JSON OR .SEND AT THE END
  
  res.cookie('token', '', {maxAge:1, httpOnly:true}).json({message: "Cookie deleted"});
  // res.clearCookie('token');

});

app.use("/api/Register", registerRoutes);
app.use("/api/Login", loginRoutes);
app.use("/api", postRoutes);
app.use("/api", userRoutes);
