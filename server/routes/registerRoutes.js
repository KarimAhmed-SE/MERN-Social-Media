import registerController from "../controller/registerController.js";
import express from "express";
import multer from "multer";


const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        return cb(null, "public/images/")
    },
    filename: function (req, file, cb){
        return cb(null, `${req.body.email}_${file.originalname}`)
    }
})

const uploadMiddleware = multer({storage});

router.post("/", uploadMiddleware.single('profilePic'), registerController)

export default router;