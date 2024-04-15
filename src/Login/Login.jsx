import React, { useState } from "react";
// import { axios } from "axios";'
import axios from "axios";
import { Outlet } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

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

        try {
          const response = await axios.post(
            "http://localhost:8000/api/v1/users/login",
            formData,
            // {
            //   headers: {
            //     "Content-Type": "multipart/form-data",
            //   },
            // }
          );
          console.log(response.data);
          // console.log("Registration successful!", response.data);
          // Handle success, possibly redirect or show a success message
        } catch (error) {
          console.error("Registration failed:", error);
          // Handle error, possibly show an error message
        }
  };

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
            <a
              href=""
              className="text-purple-700  underline hover:text-purple-600 p-1 rounded-md font-semibold "
            >
              Register
            </a>
          </div>
        </form>
      </div>
      {/* <Outlet/> */}
    </div>

     
  );
}

export default Login;
