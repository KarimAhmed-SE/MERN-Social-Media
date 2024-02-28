import React, { useEffect, useState, useReducer, useContext } from "react";
import logo from "../Logo.png";
import { Link } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import axios from "axios";
import { userContext } from "../../userContext";
import LoopIcon from "@mui/icons-material/Loop";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

function Friend({ userPic, firstName, lastName, friendId }) {
  const { userInfo, setUserInfo } = useContext(userContext);
  const friends = userInfo && userInfo.friends;

  const [isFriend, setIsFriend] = useState(
    userInfo && friends.find((friend) => friend._id === friendId)
  );

  let isUser = false;

  if (userInfo && userInfo._id === friendId) {
    isUser = true;
  }

  const [newFriends, setNewFriends] = useState(friends);

  const addFriend = async () => {
    try {
      const response = await axios.put(
        `http://localhost:6001/api/friends/${
          userInfo && userInfo._id
        }/${friendId}`,
        "",
        {
          withCredentials: true,
        }
      );

      const updatedFriendsList = {
        ...userInfo,
        friends: response.data,
      };

      setUserInfo(updatedFriendsList);
      setIsFriend(response.data.find((friend) => friend._id === friendId));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex w-full space-x-2 items-center ">
        <div className="flex justify-between items-center w-full">
          <div className="flex justify-start items-center space-x-4 w-full">
            <Link to={`/Profile/${friendId}`}>
              <img
                className="h-14 w-14 rounded-full "
                src={`http://localhost:6001/${userPic}`}
                alt="Logo"
              />
            </Link>

            <div className="flex-col justify-center items-center w-1/2">
              <Link
                to={`/Profile/${friendId}`}
                className="2xl text-white hover:text-slate-400"
              >
                {firstName} {lastName}
              </Link>
              <p className=" text-slate-400">
                {userInfo && userInfo.friends.length} friends
              </p>
            </div>
          </div>

          <div className="flex justify-end items-center w-1/4 ">
            {isUser ? (
              <div className="text-white text-4xl ">...</div>
            ) : (
              <div>
                <button onClick={addFriend}>
                  {isFriend ? (
                    <div>
                      {" "}
                      <PersonRemoveIcon
                        sx={{
                          color: "white",
                          "&:hover": { cursor: "pointer", color: "gray" },
                        }}
                      />{" "}
                    </div>
                  ) : (
                    <div>
                      <PersonAddIcon
                        sx={{
                          color: "white",
                          "&:hover": { cursor: "pointer", color: "gray" },
                        }}
                      />
                    </div>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Friend;
