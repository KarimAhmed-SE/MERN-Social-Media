import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import image from "./RegisterBackground.jpg";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sex, setSex] = useState("");
  const [country, setCountry] = useState("");
  const [profilePic, setProfilePic] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const validate = (value) => {
    if (value.length < 6) {
      enqueueSnackbar(
        {
          message:
            "Password not long enough! Password should be at least 6 characters long",
        },
        { variant: "error" }
      );
    } else {
      registerHandler();
    }
  };

  const registerHandler = () => {
    const data = new FormData();

    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("email", email);
    data.append("password", password);
    data.append("sex", sex);
    data.append("country", country);
    data.append("profilePic", profilePic);

    axios
      .post(`http://localhost:6001/api/Register`, data)
      .then(() => {
        enqueueSnackbar("Registered successfully!", { variant: "success" });
        navigate("/Login");
        console.log("hello");
      })
      .catch((error) => {
        console.log(error.response.data);
        Object.keys(error.response.data.errors).forEach((key) => {
          if (error.response.data.errors[key] != "") {
            enqueueSnackbar(
              { message: error.response.data.errors[key] },
              { variant: "error" }
            );
          }
        });
      });
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen w-full bg-[url(pages\background.jpg)] bg-cover">
        <div className="block md:flex md:w-[65%] w-3/4 h-full md:h-[full]  justify-center items-center mx-auto md:overflow-hidden xl:shadow-teal-500 xl:shadow-2xl  ">
          <div className="block md:flex justify-center items-center">
            {/*image */}
            <div className=" sm:hidden md:hidden lg:hidden xl:block md:w-3/4">
              <Link
                to={"/"}
                className="w-20 h-10 p-2 text-white text-center bg-sky-400"
              >
                <img src={image} className="object-fill w-full h-full"></img>
              </Link>
            </div>

            {/*form */}
            <div className="block md:flex-col bg-white w-full h-screen pb-10 pr-5 pl-10 md:h-fit md:w-full shadow-teal-500 shadow-2xl xl:shadow-none">
              <div className="flex justify-end items-end">
                <Link
                  to={"/Login"}
                  className="w-20 text-center p-2 h-10 bg-white hover:bg-sky-400 hover:text-white transition ease-in-out duration-300"
                >
                  Login
                </Link>
                <Link
                  to={"#"}
                  className="w-20 h-10 p-2 text-white text-center bg-sky-400"
                >
                  Register
                </Link>
              </div>
              <div className="grid justify-start items-center space-y-10">
                <h2 className="text-3xl">Register</h2>
                <div className="grid justify-center items-center w-full mx-auto space-y-10">
                  <div className="flex justify-between space-x-10 w-full">
                    <div className=" grid w-full">
                      <label className=" text-lg"> First Name </label>
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
                      <label className=" text-lg"> Last Name </label>
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
                      className="border-2  border-gray-400 rounded-md pl-2 pt-1 hover:bg-slate-200 hover:border-2 hover:border-black transition-all ease-in-out duration-300"
                      value={password}
                      onChange={(ev) => {
                        setPassword(ev.target.value);
                      }}
                    ></input>
                  </div>

                  <div className="grid">
                    <label className=" text-lg"> Confirm Password </label>
                    <input
                      type="text"
                      className="border-2  border-gray-400 rounded-md pl-2 pt-1 hover:bg-slate-200 hover:border-2 hover:border-black transition-all ease-in-out duration-300"
                      value={confirmPassword}
                      onChange={(ev) => {
                        setConfirmPassword(ev.target.value);
                      }}
                    ></input>
                  </div>

                  <div className="flex justify-between items-center space-x-6">
                    <select
                      className="bg-white hover:bg-slate-300 border-none transition ease-in-out duration-300 w-1/2 h-10  cursor-pointer  border-sky-700"
                      value={sex}
                      onChange={(ev) => {
                        setSex(ev.target.value);
                      }}
                    >
                      <option value="null">Select Sex</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>

                    <select
                      className="bg-white hover:bg-slate-300 transition ease-in-out duration-300 cursor-pointer  w-1/2 h-10  border-sky-700"
                      value={country}
                      onChange={(ev) => {
                        setCountry(ev.target.value);
                      }}
                    >
                      <option value="null">Select country</option>
                      <option value="Egypt">Egypt</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Germany">Germany</option>
                      <option value="UAE">UAE</option>
                      <option value="Switzerland">Switzerland</option>
                    </select>
                  </div>

                  <div className="flex  items-center h-14 w-full cursor-pointer hover:bg-slate-300">
                    <label
                      className="w-full cursor-pointer text-center "
                      htmlFor="input-file"
                    >
                      {/* <img className="cursor-pointer absolute h-10 w-10 ml-3 -top-1 right-0.5" /> */}
                      <AccountCircleIcon
                        fontSize="large"
                        sx={{ cursor: "pointer" }}
                      />{" "}
                      Upload Picture
                    </label>

                    <input
                      id="input-file"
                      className="hidden"
                      type="file"
                      accept="image/*"
                      onChange={(ev) => setProfilePic(ev.target.files[0])}
                    />
                  </div>

                  <div className="flex space-x-2">
                    <input
                      className="hover:cursor-pointer"
                      type="checkbox"
                      id="policy"
                    />
                    <p>
                      By checking this, you agree to the{" "}
                      <a className="text-blue-500 hover:cursor-pointer">
                        Terms
                      </a>{" "}
                      and acknowledge the{" "}
                      <a className="text-blue-500 hover:cursor-pointer">
                        Privacy Policy
                      </a>{" "}
                      to create an account
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <input
                      className="hover:cursor-pointer"
                      type="checkbox"
                      id="newsletter"
                    />
                    <p>Subscribe to our newsletter</p>
                  </div>

                  <div className="flex justify-end items-end">
                    <button
                      className="rounded-full bg-sky-400 text-white hover:bg-sky-500 transition ease-in-out duration-300 w-24 h-10"
                      onClick={validate}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
