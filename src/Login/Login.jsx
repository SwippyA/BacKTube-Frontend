import React, { useState } from "react";
// import { store } from "./Store/Store.js";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../Store/Reducer/Login.js";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import toast from "react-hot-toast";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { isAuthenticated, user, accessToken } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  console.log(isAuthenticated);
  console.log(user);
  console.log(accessToken);

  // Event handler function for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can access the values of the input fields from the state variables here
    const formData = {
      email: email,
      password: password,
      username: username,
    };
    console.log(formData);
    //   {
    //     "email":"dfkjhdsjfh@gmail.com",
    //     "password":"3434343242",
    //     "username":"sdhjfh"
    // }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        formData
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      );
      console.log(response.data);
      toast.success(response.data.message);
      dispatch(login(response.data.data));

      // console.log("Registration successful!", response.data);
      // Handle success, possibly redirect or show a success message
    } catch (error) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.statusText);
      toast.error(error.response.statusText); // Displaying error message to user
    }
  };
  // console.log(user.username);
  // console.log(user._id);

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-900 justify-center items-center">
      <h1 className="m-2 text-4xl hover:underline  duration-700 font-extrabold text-purple-700">
        LOGIN
      </h1>
      <div className="w-[400px] h-fit bg-gray-800 rounded-xl">
        <form onSubmit={handleSubmit} className="flex flex-col w-full p-5">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="p-2 bg-purple-700 text-lg focus:text-white m-1 rounded-xl font-bold"
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="p-2 bg-purple-700 focus:text-white m-1 rounded-xl text-lg font-bold"
            placeholder="Password"
            required
          />
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="p-2 bg-purple-700 text-lg m-1 focus:text-white rounded-xl font-bold"
            placeholder="Username"
            required
          />

          <button
            type="submit"
            className="p-2 mx-auto hover:bg-purple-600 w-1/2 bg-purple-700 rounded-xl text-lg m-1 font-bold text-white"
          >
            Login
          </button>
          <div className="flex items-center justify-center text-white font-bold">
            <p className="mr-1">Don't Have account</p>
            <Link
              to={"/register"}
              className="text-purple-700 underline hover:text-purple-600 p-1 rounded-md font-semibold"
            >
              Register
            </Link>
          </div>
          <div className="flex items-center justify-center text-white font-bold">
            <p className="mr-1">Forget Password</p>
            <Link
              to={"/forget_password"}
              className="text-purple-700 underline hover:text-purple-600 p-1 rounded-md font-semibold"
            >
              Forget_password
            </Link>
          </div>
        </form>
      </div>
      {/* <Outlet/> */}
    </div>
  );
}

export default Login;
