import jwt from "jsonwebtoken";
import "dotenv/config";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  try {
    const user = jwt.verify(token, process.env.SECRET);
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
  }
};
