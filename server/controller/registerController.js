
import bcrypt from "bcrypt";
import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import User from "../model/User.js";

const salt = bcrypt.genSaltSync(10);


const handleError = (err) => {
    // console.log(err.message, err.code);
  let errors = {
    email: "",
    password:""
  };

  //duplicates error code

  if (err.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }

  //validation errors

  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;

      // console.log(properties.path)
      // console.log(properties.message);
    });
  }

  return errors;
};


const register = async (req, res)=>{


    const {path} = req.file;

try{

    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt),
        sex: req.body.sex, 
        country: req.body.country,
        profilePic: path,
        friends: req.body.friends,
        location: req.body.location,
        occupation: req.body.occupation,
        viewedProfile: Math.floor(Math.random()*10000),
        impressions: Math.floor(Math.random()*10000),

    }

    const user = await User.create(newUser);
    return res.status(201).send({user: user._id});


}catch(err){

    const errors = handleError(err);
    res.status(400).json({errors});
}

}

export default register;