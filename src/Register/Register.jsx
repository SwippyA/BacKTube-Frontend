import React, { useState } from "react";
import {Link} from "react-router-dom"
// import { axios } from "axios";'
import axios from "axios";

function Register() {
  // State variables to hold the values of the input fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null); // State for avatar file
  const [coverImage, setCoverImage] = useState(null); // State for cover image
  const [user, setUser] = useState({});

  // Event handler functions to update state when input values change
  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  // Event handler for cover image file input
  const handleCoverImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  // Event handler function for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can access the values of the input fields from the state variables here
    const formData = {
      fullName: fullName,
      email: email,
      password: password,
      username: username,
      avatar: avatar,
      coverImage: coverImage,
    };
    // console.log(formData);

    try {
      const response = await axios.post(
        "https://backtube-1.onrender.com/api/v1/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data.message);
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
        Register Now
      </h1>
      <div className="w-[400px] h-fit bg-gray-800 rounded-xl">
        <form onSubmit={handleSubmit} className="flex flex-col w-full p-5">
          <input
            type="text"
            value={fullName}
            onChange={handleFullNameChange}
            className="p-2 bg-purple-700 text-lg m-1 focus:text-white font-bold rounded-xl"
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="p-2 bg-purple-700 text-lg focus:text-white m-1 rounded-xl font-bold"
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="p-2 bg-purple-700 focus:text-white m-1 rounded-xl text-lg font-bold"
            placeholder="Password"
            required
          />
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className="p-2 bg-purple-700 text-lg m-1 focus:text-white rounded-xl font-bold"
            placeholder="Username"
            required
          />
          <label htmlFor="avatar" className="text-white font-bold mb-1">
            Avatar
          </label>
          <input
            type="file"
            id="avatar"
            onChange={handleAvatarChange}
            className="p-2 bg-purple-700 text-lg m-1 focus:text-white rounded-xl font-bold"
            required
          />

          <label htmlFor="coverImage" className="text-white font-bold mb-1">
            Cover Image
          </label>
          <input
            type="file"
            onChange={handleCoverImageChange}
            id="coverImage"
            className="p-2 bg-purple-700 text-lg m-1 focus:text-white rounded-xl font-bold"
          />

          <button
            type="submit"
            className="p-2 mx-auto hover:bg-purple-600 w-1/2 bg-purple-700 rounded-xl text-lg m-1 font-bold text-white"
          >
            Register
          </button>
          <div className="flex items-center justify-center text-white font-bold">
            <p className="mr-1">Already have an account</p>
            <Link
              to={"/login"}
              className="text-purple-700 underline hover:text-purple-600 p-1 rounded-md font-semibold"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
