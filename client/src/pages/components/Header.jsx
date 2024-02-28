import React, { useState, useEffect, useContext } from "react";
import logo from "../Logo.png";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import LightModeIcon from "@mui/icons-material/LightMode";
import PushPinIcon from "@mui/icons-material/PushPin";
import axios from "axios";
import { userContext } from "../../userContext";

function Header() {
  const { userInfo, setUserInfo } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:6001/api/loggedIn`, { withCredentials: true })
      .then((response) => {
        setUserInfo(response.data);
        console.log("Success");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const logoutHandler = () => {
    axios.defaults.withCredentials = true;
    axios.get(`http://localhost:6001/logout`);
    setUserInfo(null);
    navigate("/");
  };

  return (
    <div className="fixed w-full top-0 z-50 bg-slate-700">
      <div >
        <div className="flex mx-auto w-[94%]  justify-between items-center  py-3">
          <div className="flex justify-center items-center w-1/3">
            <Link to={"/"}>
              <img className="h-10 w-15 " src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="flex justify-center items-center space-x-6 mx-auto w-1/3">
            <Link
              to={"#"}
              className="text-xl text-white hover:underline hover:text-sky-500"
            >
              <HomeIcon
                fontSize="large"
                sx={{
                  color: "white",
                  "&:hover": { cursor: "pointer", color: "skyblue" },
                }}
              />
            </Link>
            <Link
              to={"#"}
              className="text-xl text-white hover:underline hover:text-sky-500"
            >
              <PushPinIcon
                fontSize="large"
                sx={{
                  color: "white",
                  "&:hover": { cursor: "pointer", color: "skyblue" },
                }}
              />
            </Link>
            <Link
              to={"#"}
              className="text-xl text-white hover:underline hover:text-sky-500"
            >
              <LightModeIcon
                fontSize="large"
                sx={{
                  color: "white",
                  "&:hover": { cursor: "pointer", color: "skyblue" },
                }}
              />
            </Link>
            <Link
              to={"#"}
              className="text-xl text-white hover:underline hover:text-sky-500"
            >
              <SettingsIcon
                fontSize="large"
                sx={{
                  color: "white",
                  "&:hover": { cursor: "pointer", color: "skyblue" },
                }}
              />
            </Link>
          </div>


          <div className="flex justify-center items-center space-x-3 w-1/3">
            {userInfo ? (
              <div>
                {userInfo && (
                  <div className="flex justify-center items-center space-x-3">
                    <Link to={`/Profile/${userInfo._id}`}>
                      <img
                        className="h-16 w-16 rounded-full  top-[17rem] left-1"
                        src={`http://localhost:6001/${userInfo.profilePic}`}
                      ></img>
                    </Link>

                    <button
                      className="w-24 h-12 bg-sky-400 rounded-full text-white hover:bg-sky-500 transition ease-in-out duration-300 "
                      onClick={logoutHandler}
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex justify-center items-center space-x-3">
                {" "}
                <Link
                  to={"/Login"}
                  className="w-20 text-center p-2 h-10 rounded-full text-white bg-sky-400 hover:bg-sky-500 transition ease-in-out duration-300"
                >
                  Login
                </Link>
                <Link
                  to={"/Register"}
                  className="w-20 h-10 p-2 text-white rounded-full text-center bg-sky-400 hover:bg-sky-500 transition ease-in-out duration-300"
                >
                  Register
                </Link>{" "}
              </div>
            )}

            <input
              type="text"
              className="rounded-full p-3 border-none w-1/2  hover:bg-slate-200 focus:w-3/4 transition-all ease-in-out duration-300"
              placeholder="Search..."
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
