import express from "express";
import multer from "multer";
import {
  createPost,
  displayPostFeed,
  displayUserFeed,
  likePosts,
} from "../controller/post.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    return cb(null, `${req.body.description}_${file.originalname}`);
  },
});

const uploadMiddleware = multer({ storage });

/*CREATE */

router.post(
  "/createPost",
  uploadMiddleware.single("file"),
  verifyToken,
  createPost
);

router.get("/displayPosts", displayPostFeed);

router.get("/displayUserPosts/:id", displayUserFeed);

router.put("/likes/:id", verifyToken, likePosts);

export default router;
