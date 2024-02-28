import React, { useState, useContext } from "react";
import logo from "../Logo.png";
import { Link } from "react-router-dom";
import ImageIcon from "@mui/icons-material/Image";
import LocalSeeIcon from "@mui/icons-material/LocalSee";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../userContext";

function CreatePost({ posts, setPosts }) {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();
  const { userInfo, setUserInfo } = useContext(userContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const createPostHandler = () => {
    const data = new FormData();

    data.append("description", description);

    if(file){
      data.append("file", file);
      data.append("filePath", file.name);
    }
   
    axios
      .post(`http://localhost:6001/api/createPost`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((response) => {
        enqueueSnackbar(
          { message: "Posted successfully" },
          { variant: "success" }
        );

        setPosts(response.data);

        setDescription("");
        setFile(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="rounded-md bg-slate-700 w-full flex-col p-5 space-y-3 h-fit">
      {userInfo ? (
        <div className="space-y-3">
          <div className="">
            <div className="flex justify-center items-center space-x-6">
              <Link to={"/"}>
                <img
                  className="h-14 w-14 rounded-full  m-2"
                  src={`http://localhost:6001/${userInfo.profilePic}`}
                  alt="Logo"
                />
              </Link>

              <input
                type="text"
                className="rounded-full p-3 h-14 border-none w-full hover:bg-slate-200 transition-all ease-in-out duration-300"
                placeholder="What's on your mind..."
                value={description}
                onChange={(ev) => {
                  setDescription(ev.target.value);
                }}
              ></input>
            </div>{" "}
          </div>
          <div className="w-[100%] h-[1px] bg-slate-400 mx-auto"></div>
          <div className="flex-col ">
            <div
              className={
                file
                  ? "flex justify-center items-center w-full h-32 p-2"
                  : "hidden"
              }
            >
              <label
                className="text-slate-400 flex justify-center items-center hover:text-sky-400 hover:bg-slate-500 hover:cursor-pointer border-2 border-dotted  w-full h-full"
                htmlFor="uploadFile"
              >
                {file ? file.name : <p>nothing uploaded</p>}
              </label>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                id="uploadFile"
                onChange={(ev) => setFile(ev.target.files[0])}
              />
            </div>
            <div className="flex justify-center items-center space-x-4 sm:space-x-8 md:space-x-8">
              <div className="flex space-x-1 ">
                <ImageIcon sx={{ color: "white" }} />

                <label
                  className="text-slate-400 hover:text-sky-400 hover:cursor-pointer md:block hidden"
                  htmlFor="uploadFile"
                >
                  Image
                </label>
              </div>
              <div className="flex space-x-1">
                <LocalSeeIcon sx={{ color: "white" }} />
                <button className="text-slate-400 hover:text-sky-400 hidden md:block ">
                  Clip
                </button>
              </div>
              <div className="flex space-x-1">
                <AttachFileIcon sx={{ color: "white" }} />
                <button className="text-slate-400 hover:text-sky-400 hidden md:block">
                  Attachment
                </button>
              </div>
              <div className="flex space-x-1">
                <GraphicEqIcon sx={{ color: "white" }} />
                <button className="text-slate-400 hover:text-sky-400 hidden md:block">
                  Audio
                </button>
              </div>
              <div>
                <button
                  className="rounded-full bg-sky-400 text-white hover:bg-sky-500 transition ease-in-out duration-300 w-20 h-8"
                  onClick={createPostHandler}
                >
                  Post
                </button>
              </div>
            </div>
          </div>{" "}
        </div>
      ) : (
        <div className="w-full">
          {" "}
          <p className="text-white text-xl  text-center">
            {" "}
            To create a post you must first{" "}
            <Link
              className=" underline text-sky-300 hover:text-sky-400 "
              to={"/Login"}
            >
              Sign in.
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default CreatePost;
