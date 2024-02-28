import React, { useState } from "react";
import { Link } from "react-router-dom";
import image from "./RegisterBackground.jpg";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const loginHandler = () => {
    const data = {
      email,
      password,
    };

    axios
      .post(`http://localhost:6001/api/Login`, data, { withCredentials: true })
      .then(() => {
        enqueueSnackbar("Login successul", { variant: "success" });
        console.log("Hello here mmmm");
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log(error.request);
        } else if (error.message) {
          console.log(error.message);
        }

        enqueueSnackbar({ message: error.message }, { variant: "error" });
      });
  };
  return (
    <div>
      <div className="flex justify-center items-center h-screen w-full bg-[url(pages\background.jpg)] bg-cover">
        <div className="block md:flex md:w-[40%] w-1/2 h-full md:h-[35rem] justify-center items-center  mx-auto md:overflow-hidden shadow-none xl:shadow-teal-500 xl:shadow-2xl ">
          <div className="block md:flex justify-center items-center">
            {/*image */}
            <div className="sm:hidden md:hidden lg:hidden xl:block md:w-3/4">
              <Link
                to={"/"}
                className="w-20 h-10 p-2 text-white text-center bg-sky-400"
              >
                <img src={image} className="object-fill w-full h-full"></img>
              </Link>
            </div>

            {/*form */}
            <div className="block md:flex-col bg-white w-full h-full md:h-[35rem] md:w-full pb-10 pr-5 pl-10 shadow-teal-500 shadow-2xl xl:shadow-none ">
              <div className="flex justify-end items-end">
                <Link
                  to={"#"}
                  className="w-20 h-10 p-2 text-white text-center bg-sky-400"
                >
                  Login
                </Link>
                <Link
                  to={"/Register"}
                  className="w-20 text-center p-2 h-10 bg-white hover:bg-sky-400 hover:text-white transition ease-in-out duration-300"
                >
                  Register
                </Link>
              </div>
              <div className="grid justify-start items-center space-y-10">
                <h2 className="text-3xl">Login</h2>
                <p>
                  Need an account?{" "}
                  <Link
                    to={"/Register"}
                    className="text-blue-500 hover:cursor-pointer hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
                <div className="grid justify-center items-center mt-20 md:h-full md:w-full mx-auto space-y-10">
                  <div className="grid">
                    <label className=" text-lg"> E-mail </label>
                    <input
                      type="text"
                      className="border-2  border-gray-400 rounded-md pl-2 pt-1 hover:bg-slate-200 hover:border-2 hover:border-black transition-all ease-in-out duration-300"
                      value={email}
                      onChange={(ev) => {
                        setEmail(ev.target.value);
                      }}
                    ></input>
                  </div>

                  <div className="grid">
                    <label className=" text-lg"> Password </label>
                    <input
                      type="password"
                      className="border-2  border-gray-400 rounded-md pl-2 pt-1 hover:bg-slate-200 hover:border-black transition-all ease-in-out duration-300"
                      value={password}
                      onChange={(ev) => {
                        setPassword(ev.target.value);
                      }}
                    ></input>
                  </div>

                  <div className="block md:flex md:space-x-10">
                    <div className="flex space-x-2">
                      <input className="hover:cursor-pointer" type="checkbox" />
                      <p>Stay signed in</p>
                    </div>

                    <a className="hover:text-blue-500 hover:cursor-pointer hover:underline">
                      Forgot username or password?
                    </a>
                  </div>

                  <button
                    className="rounded-full bg-sky-400 text-white hover:bg-sky-500 transition ease-in-out duration-300 w-24 h-10"
                    onClick={loginHandler}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
