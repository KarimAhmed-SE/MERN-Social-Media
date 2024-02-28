import React, { useState, useEffect, useContext } from "react";
import DisplayPost from "./components/DisplayPost";
import Header from "./components/Header";
import LoopIcon from "@mui/icons-material/Loop";
import axios from "axios";
import { useParams } from "react-router-dom";
import ImageIcon from "@mui/icons-material/Image";
import LocalSeeIcon from "@mui/icons-material/LocalSee";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MaleIcon from "@mui/icons-material/Male";
import { userContext } from "../userContext";

function Profile() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const { userInfo, setUserInfo } = useContext(userContext);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sex, setSex] = useState("");
  const [occupation, setOccupation] = useState("");
  const [country, setCountry] = useState("");
  const [profilePic, setProfilePic] = useState();
  const [banner, setBanner] = useState();
  const navigate = useNavigate();

  let isUser = false;

  const { id } = useParams();

  if (userInfo && userInfo._id === id) {
    isUser = true;
  } else {
    isUser = false;
  }

  useEffect(() => {
    axios
      .all([
        axios.get(`http://localhost:6001/api/displayUserPosts/${id}`, {
          withCredentials: true,
        }),
        axios.get(`http://localhost:6001/api/profile/${id}`, {
          withCredentials: true,
        }),
      ])
      .then(
        axios.spread((posts, profile) => {
          setPosts(posts.data);
          setUser(profile.data);
          setFirstName(profile.data.firstName);
          setLastName(profile.data.lastName);
          setOccupation(profile.data.occupation);
          setCountry(profile.data.country);
          setLoading(false);
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleUpdate = () => {


    const data = new FormData();
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("occupation", occupation);
    data.append("country", country);
    data.append("sex", sex);
    if (profilePic) {
      data.append("files", profilePic);
      data.append("filesPath", profilePic.name);
    }
    if (banner) {
      data.append("files", banner);
      data.append("filesPath", banner.name);
    }

    setLoading(true);

    axios
      .put(`http://localhost:6001/api/updateUser/${id}`, data, {headers:{'Content-Type': 'multipart/form-data'},
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data);
        setLoading(false);
        setEditing(false);

      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar({ message: error, variant: "error" });
      });
  };

  const createPostHandler = () => {
    const data = new FormData();
    data.append("description", description);
    data.append("file", file);

    axios
      .post(`http://localhost:6001/api/createPost`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then(() => {
        enqueueSnackbar(
          { message: "Post created successfully!" },
          { variant: "success" }
        );
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Header />

      <div className="flex w-full px-20 my-20 mx-auto justify-center space-x-10 ">
        <div className="flex-col justify-center items-center mx-auto mt-10 h-full w-1/2 space-y-10">
          <div className="rounded-md bg-slate-700 w-full flex-col p-5 space-y-3 h-fit z-9">
            <div className="relative space-y-3 z-10">
              {loading ? (
                <>Loading...</>
              ) : (
                <>
                  <img
                    className="w-full h-[20rem] "
                    src={`http://localhost:6001/${user.banner}`}
                  ></img>
                  <div className="flex justify-end items-center my-3">
                    <img
                      className="h-24 w-24 rounded-full absolute top-[17rem] left-1"
                      src={`http://localhost:6001/${user.profilePic}`}
                    ></img>

                    {isUser ? (
                      <div>
                        {" "}
                        {editing ? (
                          <div>
                            {" "}
                            <button
                              className="w-28 h-10 bg-red-400 rounded-full text-white"
                              onClick={handleUpdate}
                            >
                              Save Changes
                            </button>{" "}
                          </div>
                        ) : (
                          <div>
                            {" "}
                            <button
                              className="w-32 h-10 bg-sky-400 rounded-full text-white"
                              onClick={() => setEditing(true)}
                            >
                              <EditIcon color="white"/> Edit Profile
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="m-5"></div>
                    )}
                  </div>
                  {editing ? (
                    <div className="flex space-x-5">
                      <div className=" grid w-full">
                        <label className=" text-lg text-white">
                          {" "}
                          First Name{" "}
                        </label>
                        <input
                          type="text"
                          className=" border-2  border-gray-400 rounded-md pl-2 pt-1 hover:bg-slate-200 hover:border-2 hover:border-black transition-all ease-in-out duration-300"
                          value={firstName}
                          onChange={(ev) => {
                            setFirstName(ev.target.value);
                          }}
                        ></input>
                      </div>

                      <div className="grid w-full">
                        <label className=" text-lg text-white">
                          {" "}
                          Last Name{" "}
                        </label>
                        <input
                          type="text"
                          className=" border-2  border-gray-400 rounded-md pl-2 pt-1 hover:bg-slate-200 hover:border-2 hover:border-black transition-all ease-in-out duration-300"
                          value={lastName}
                          onChange={(ev) => {
                            setLastName(ev.target.value);
                          }}
                        ></input>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="my-3">
                        <p className="text-xl text-white ">
                          {" "}
                          {user.firstName} {user.lastName}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex-col mx-auto justify-center items-center space-y-3">
                    <div className="flex justify-start items-center space-x-3">
                      <WorkIcon sx={{ color: "white" }} />
                      {editing ? (
                        <div className="flex space-x-3">
                          {" "}
                          <p className="text-slate-400">Working in </p>{" "}
                          <input
                            type="text"
                            className=" border-2  border-gray-400 rounded-md pl-2 pt-1 hover:bg-slate-200 hover:border-2 hover:border-black transition-all ease-in-out duration-300"
                            value={occupation}
                            onChange={(ev) => {
                              setOccupation(ev.target.value);
                            }}
                          ></input>{" "}
                        </div>
                      ) : (
                        <div>
                          <p className="text-slate-400">
                            Working in {user.occupation}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-start items-center space-x-3">
                      <LocationOnIcon sx={{ color: "white" }} />
                      {editing ? (
                        <div className="flex space-x-3">
                          {" "}
                          <p className="text-slate-400">Living in </p>{" "}
                          <input
                            type="text"
                            className=" border-2  border-gray-400 rounded-md pl-2 pt-1 hover:bg-slate-200 hover:border-2 hover:border-black transition-all ease-in-out duration-300"
                            value={country}
                            onChange={(ev) => {
                              setCountry(ev.target.value);
                            }}
                          ></input>{" "}
                        </div>
                      ) : (
                        <div>
                          <p className="text-slate-400">
                            Living in {user.country}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-start items-center space-x-3">
                      <MaleIcon sx={{ color: "white" }} />
                      {editing ? (
                        <div className="">
                          <select
                            className="bg-white hover:bg-slate-300 border-none transition ease-in-out duration-300 h-10 rounded-md  cursor-pointer  border-sky-700"
                            value={sex}
                            onChange={(ev) => {
                              setSex(ev.target.value);
                            }}
                          >
                            <option value="null">Select Sex</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>
                      ) : (
                        <div>
                          <p className="text-slate-400">{user.sex}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {editing ? (
                    <>
                      {" "}
                      <div
                        className={
                          profilePic
                            ? "flex justify-center items-center w-full h-32 p-2"
                            : "hidden"
                        }
                      >
                        <label
                          className="text-slate-400 flex justify-center items-center hover:text-sky-400 hover:bg-slate-500 hover:cursor-pointer border-2 border-dotted  w-full h-full"
                          htmlFor="uploadProfilePic"
                        >
                          {profilePic ? (
                            profilePic.name
                          ) : (
                            <p>nothing uploaded</p>
                          )}
                        </label>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          id="uploadProfilePic"
                          onChange={(ev) => setProfilePic(ev.target.files[0])}
                        />
                      </div>
                      <label
                        className="p-3 w-fit h-fit text-white rounded-md bg-sky-400 hover:bg-sky-500 hover:cursor-pointer md:block hidden"
                        htmlFor="uploadProfilePic"
                      >
                        Change Profile Picture
                      </label>
                      <div
                        className={
                          banner
                            ? "flex justify-center items-center w-full h-32 p-2"
                            : "hidden"
                        }
                      >
                        <label
                          className="text-slate-400 flex justify-center items-center hover:text-sky-400 hover:bg-slate-500 hover:cursor-pointer border-2 border-dotted  w-full h-full"
                          htmlFor="uploadBanner"
                        >
                          {banner ? banner.name : <p>nothing uploaded</p>}
                        </label>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          id="uploadBanner"
                          onChange={(ev) => setBanner(ev.target.files[0])}
                        />
                      </div>
                      <label
                        className="p-3 w-fit h-fit text-white rounded-md bg-sky-400 hover:bg-sky-500 hover:cursor-pointer md:block hidden"
                        htmlFor="uploadBanner"
                      >
                        Change Profile Banner
                      </label>{" "}
                    </>
                  ) : (
                    <></>
                  )}

                  <div className="my-3">
                    <p className="text-slate-400">
                      {user.friends && user.friends.length} friends
                    </p>
                  </div>

                  <div className="w-[100%] h-[1px] bg-slate-400 mx-auto"></div>

                  {isUser ? (
                    <div className="space-y-3">
                      {" "}
                      <input
                        type="text"
                        className="rounded-full p-3 border-none w-full hover:bg-slate-200 transition-all ease-in-out duration-300"
                        placeholder="What's on your mind..."
                        value={description}
                        onChange={(ev) => {
                          setDescription(ev.target.value);
                        }}
                      ></input>
                      <div className="w-[100%] h-[1px] bg-slate-400 mx-auto"></div>
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
                    </div>
                  ) : (
                    <div></div>
                  )}
                </>
              )}
            </div>
          </div>

          {loading ? (
            <div>
              <LoopIcon fontSize="large" />
            </div>
          ) : (
            <div className="space-y-10">
              {posts &&
                posts
                  .slice()
                  .reverse()
                  .map((post) => {
                    return (
                      <div>
                        <DisplayPost {...post} />
                      </div>
                    );
                  })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
