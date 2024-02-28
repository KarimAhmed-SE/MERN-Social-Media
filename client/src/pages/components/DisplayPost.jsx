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
import Friend from "./Friend";
import ShowImage from "./ShowImage";

function DisplayPost(props) {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo, setUserInfo } = useContext(userContext);
  const [showImage, setShowImage] = useState(false);

  let userId = 0;

  if (userInfo) {
    userId = userInfo._id;
  } else {
    userId = 0;
  }

  const [likes, setLikes] = useState(
    Object.keys(props.likes).includes(userId) //initial state
  );
  const [likesCount, setLikesCount] = useState(Object.keys(props.likes).length); //initial state

  const likePost = async () => {
    const response = await axios.put(
      `http://localhost:6001/api/likes/${props._id}`,
      "",
      { withCredentials: true }
    );

    setLikes(Object.keys(response.data.likes).includes(userId)); //updates to new value based on what the back end is returning
    setLikesCount(Object.keys(response.data.likes).length); //updates to new value based on what the back end is returning
  };

  return (
    <div>
      <div>
        {" "}
        <div className="w-full bg-slate-700 rounded-md h-1/4 flex-col justify-center items-center p-5 space-y-3">
          <Friend
            friendId={props.userId}
            firstName={props.firstName}
            lastName={props.lastName}
            userPic={props.userPic}
          />
          <div className="flex justify-start items-start">
            <p className="text-white" key={props.description}>
              {props.description}
            </p>
          </div>

          <div className="flex justify-center items-center w-full">
            <div className="rounded-md w-fit h-fit bg-red-600 hover:cursor-pointer" onClick={()=>{setShowImage(true)}}>
              {props.pic && <img src={`http://localhost:6001/${props.pic}`} />}
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="flex justify-start items-center w-1/2 space-x-3">
              <div className="flex justify-center items-center space-x-2">
                <button className="flex space-x-1" onClick={likePost}>
                  {likes ? (
                    <div>
                      {" "}
                      <FavoriteIcon
                        sx={{
                          color: "red",
                          "&:hover": { cursor: "pointer", color: "red" },
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      {" "}
                      <FavoriteBorderIcon
                        sx={{
                          color: "white",
                          "&:hover": { cursor: "pointer", color: "red" },
                        }}
                      />
                    </div>
                  )}

                  <p className="text-white">{likesCount}</p>
                </button>
              </div>
              <div className="flex justify-center items-center space-x-2">
                <ChatBubbleOutlineIcon
                  sx={{
                    color: "white",
                    "&:hover": { cursor: "pointer", color: "gray" },
                  }}
                />
                <p className="text-white">{props.comments.length}</p>
              </div>
            </div>

            <div className="flex justify-end items-end w-1/2">
              <div className="flex justify-center items-center space-x-2">
                {" "}
                <ShareIcon
                  sx={{
                    color: "white",
                    "&:hover": { cursor: "pointer", color: "gray" },
                  }}
                />
                <p className="text-white">3</p>{" "}
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
      {showImage && <ShowImage post = {props} onClose={()=>setShowImage(false)}/>  }
    </div>
  );
}

export default DisplayPost;
