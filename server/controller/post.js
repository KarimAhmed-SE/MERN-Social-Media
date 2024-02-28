import mongoose from "mongoose";
import Post from "../model/Post.js";
import User from "../model/User.js";

/*CREATE */

export const createPost = async (req, res) => {
  const fileExists = () => {
    if (req.file) {
      return req.file.path;
    } else {
      return null;
    }
  };

  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    console.log(user);

    const newPost = {
      userId: userId,
      firstName: user.firstName,
      lastName: user.lastName,
      userPic: user.profilePic,
      description: req.body.description,
      pic: fileExists(),

      likes: {},
      comment: [],
    };

    const post = await Post.create(newPost);

    const posts = await Post.find();

    res.status(201).json(posts);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

/* READ */

export const displayPostFeed = async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const displayUserFeed = async (req, res) => {
  try {
    const { id } = req.params;

    const posts = await Post.find({ userId: id });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

/*UPDATE */

export const likePosts = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(id);

    console.log(userId);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
