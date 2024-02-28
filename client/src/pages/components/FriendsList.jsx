import React, { useState, useEffect, useContext } from "react";
import logo from "../Logo.png";
import { Link } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { userContext } from "../../userContext";
import axios from "axios";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Friend from "./Friend";

function FriendsList(props) {
  const { userInfo, setUserInfo } = useContext(userContext);

  const [friends, setFriends] = useState(userInfo.friends);

  // console.log("FriendList", friends);

  const friendsList = async () => {
    try {
      const response = await axios.get("http://localhost:6001/api/friends", {
        withCredentials: true,
      });
      const updatedFriendsList = {
        ...userInfo,
        friends: response.data,
      }

      setUserInfo(updatedFriendsList);
      console.log(friends);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    friendsList();
  }, []);

  return (
    <div className="rounded-md bg-slate-700 w-full flex-col p-5 space-y-3 h-fit">
      <div className="flex justify-start items-start mb-3">
        <p className="text-white">Friends list</p>
      </div>

      {userInfo.friends.length > 0 &&
        userInfo.friends.map((friend) => {
          return (
            <Friend
              friendId={friend._id}
              firstName={friend.firstName}
              lastName={friend.lastName}
              userPic={friend.profilePic}
            />
          );
        })}
    </div>
  );
}

export default FriendsList;
