import mongoose from "mongoose";
import User from "../model/User.js";
import jwt from "jsonwebtoken";

/*READ */

export const ShowUserDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const loggedInUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    console.log(user);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "");
};

//Display User Friends
export const getUserFriends = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);

    const friends = await Promise.all(
      user.friends.map((id) => {
        return User.findById(id);
      })
    );

    console.log("friends length", friends.length);

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, profilePic }) => {
        return { _id, firstName, lastName, occupation, location, profilePic };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

/*CREATE */

/*UPDATE */

export const addRemoveFriends = async (req, res) => {
  const { id, friendId } = req.params;

  try {
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    console.log("User Id: ", id, " Friend Id: ", friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    console.log(user.friends);

    const friends = await Promise.all(
      user.friends.map((id) => {
        console.log("HELLLOOOO", id);
        return User.findById(id);
      })
    );

    // console.log(friends);

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, profilePic }) => {
        return { _id, firstName, lastName, occupation, location, profilePic };
      }
    );

    console.log(formattedFriends);

    res.status(200).json(formattedFriends);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const country = req.body.country;
  const occupation = req.body.occupation;


  console.log(req.body.firstName);

  const oldUser = await User.findById(id);
  const newProfilePicExists = () => {
    if (req.files[0]) {
      return req.files[0].path;
    } else {
      return oldUser.profilePic;
    }
  };

  const newBannerExists = () => {
    if (req.files[1]) {
      return req.files[1].path;
    } else {
      return oldUser.banner;
    }
  };

  try {
    const user = await User.findByIdAndUpdate({_id:id}, req.body, {new:true});
    console.log(user);
    res.status(200).json(user);

  } catch (error) {
    console.log(error);
  }
};

/*DELETE */
