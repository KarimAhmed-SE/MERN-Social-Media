import express from "express";
import multer from "multer";
import { ShowUserDetails, loggedInUser, logout, getUserFriends, addRemoveFriends, updateUser } from "../controller/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/profile/:id", verifyToken, ShowUserDetails);

router.get("/loggedIn", verifyToken, loggedInUser);

router.get("/friends", verifyToken, getUserFriends);

router.put("/friends/:id/:friendId", verifyToken, addRemoveFriends);


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, "public/images/");
    },
    filename: function (req, file, cb) {
      return cb(null, `${req.body.description}_${file.originalname}`);
    },
  });
  
  const uploadMiddleware = multer({ storage });
  

router.put("/updateUser/:id", uploadMiddleware.array("files", 2),verifyToken, updateUser);

// router.post("/logout", logout);

export default router;
