import React, { useContext } from "react";
import logo from "../Logo.png";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { userContext } from "../../userContext";

function ProfileSection() {
  const { userInfo, setUserInfo } = useContext(userContext);

  return (
    <div className="w-full bg-slate-700 rounded-md h-fit flex-col justify-center items-center p-5 space-y-3">
      {userInfo && (
        <div className="space-y-3">
          {" "}
          <div className="flex w-full space-x-6 items-center ">
            <div className="flex justify-start items-start">
              <Link to={`/Profile/${userInfo._id}`}>
                <img
                  className="h-14 w-14 rounded-full "
                  src={`http://localhost:6001/${userInfo.profilePic}`}
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="flex-col justify-center items-center w-1/2">
              <Link to={`/Profile/${userInfo._id}`} className="2xl text-white hover:text-slate-400">
                {userInfo.firstName} {userInfo.lastName}
              </Link>
              <p className=" text-slate-400">{userInfo.friends.length} friends</p>
            </div>
            <div className="flex justify-end items-end w-1/4">
              <EditIcon
                sx={{
                  color: "white",
                  "&:hover": { cursor: "pointer", color: "gray" },
                }}
              />
            </div>
          </div>
          <div className="w-[100%] h-[1px] bg-slate-400 mx-auto"></div>
          <div className="flex-col mx-auto justify-center items-center space-y-3">
            <div className="flex justify-start items-center space-x-3">
              <WorkIcon sx={{ color: "white" }} />
              <p className="text-slate-400">Working in {userInfo.occupation}</p>
            </div>
            <div className="flex justify-start items-center space-x-3">
              <LocationOnIcon sx={{ color: "white" }} />
              <p className="text-slate-400">Living in {userInfo.country}</p>
            </div>
          </div>
          <div className="w-[100%] h-[1px] bg-slate-400 mx-auto"></div>
          <div className="flex-col justify-center items-center mx-auto space-y-3">
            <div className="flex">
              <div className="flex w-1/2 justify-start item-center">
                <p className="text-slate-400"> Impressions </p>
              </div>

              <div className="flex w-1/2 justify-end item-center">
                <p className="text-white"> {userInfo.impressions} </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex w-1/2 justify-start item-center">
                <p className="text-slate-400"> Who's viewed your profile </p>
              </div>

              <div className="flex w-1/2 justify-end item-center">
                <p className="text-white"> {userInfo.viewedProfile} </p>
              </div>
            </div>
          </div>
          <div className="w-[100%] h-[1px] bg-slate-400 mx-auto"></div>
          <div className="flex justify-start items-center">
            <p className="text-xl text-white">Social Profiles</p>
          </div>
          <div className="flex-col space-y-3">
            <div className="flex w-full space-x-6 items-center ">
              <div className="flex justify-start items-start">
                <Link to={"/"}>
                  <img
                    className="h-6 w-15 "
                    src="images\Linkedin.png"
                    alt="Logo"
                  />
                </Link>
              </div>

              <div className="flex justify-between items-center w-full ">
                <div className="flex-col justify-center items-center w-1/2">
                  <h2 className="2xl text-white">LinkedIn</h2>
                  <p className=" text-slate-400">Social Network</p>
                </div>
                <div className="flex justify-end items-end w-1/4">
                  <EditIcon
                    sx={{
                      color: "white",
                      "&:hover": { cursor: "pointer", color: "gray" },
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex w-full space-x-6 items-center ">
              <div className="flex justify-start items-start">
                <Link to={"/"}>
                  <img
                    className="h-6 w-15 "
                    src="images\Twitter.png"
                    alt="Logo"
                  />
                </Link>
              </div>

              <div className="flex justify-between items-center w-full ">
                <div className="flex-col justify-center items-center w-1/2">
                  <h2 className="2xl text-white">Twitter</h2>
                  <p className=" text-slate-400">Network Platform</p>
                </div>
                <div className="flex justify-end items-end w-1/4">
                  <EditIcon
                    sx={{
                      color: "white",
                      "&:hover": { cursor: "pointer", color: "gray" },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      )}
    </div>
  );
}

export default ProfileSection;
