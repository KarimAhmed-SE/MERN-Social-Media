import mongoose from "mongoose";
import User from "../model/User.js";
import bcrypt, { hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const maxAge = 3 * 24 * 60 * 60;

const loginController = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      const result = bcrypt.compareSync(req.body.password, user.password);
      if (result) {
        jwt.sign(
          { email, id: user._id },
          process.env.SECRET,
          { expiresIn: maxAge },
          (error, token) => {
            if (error) throw error;
            console.log(error);

            return res
              .status(200)
              .cookie("token", token, { httpOnly: true, maxAge: maxAge * 1000 })
              .json({
                email: user.email,
                password: user.password,
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                profilePic: user.profilePic,
              });
          }
        );
      } else {
        res.status(404).send({ error: "Password doesn't match" });
      }
    } else {
      res.status(400).send({ error: "This Email doesn't exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export default loginController;
