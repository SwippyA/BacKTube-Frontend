import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../Store/Reducer/Login.js";
import Loading from "../Utilty/Loading.jsx";
import Header from "../Header/Header";

function Edit_Profile() {
  const { isAuthenticated, user, accessToken } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    coverImage: null,
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, oldPassword, newPassword, coverImage, avatar } = formData;

    if (newPassword.length > 0 && newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long");
      return;
    }

    try {
      if (fullName && email) await updateFullNameAndEmail(fullName, email);
      if (oldPassword && newPassword) await updatePassword(oldPassword, newPassword);
      if (coverImage) await updateCoverImage(coverImage);
      if (avatar) await updateAvatar(avatar);

      toast.success("Profile updated successfully");

      // Prepare login data
      const loginData = {
        email: email || user.email,
        password: newPassword || oldPassword, 
        username: user.username || user.username 
        
        // Use newPassword if available
      };

      // Attempt login with updated data
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        loginData
      );
      
      toast.success(response.data.message);
       dispatch(login(response.data.data)); // Dispatch login action
      navigate("/"); // Navigate to the home page after successful login
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating profile");
      console.error(error);
    }
  };

  const updateFullNameAndEmail = async (fullName, email) => {
    await axios.patch(
      "http://localhost:8000/api/v1/users/update-account",
      { fullName, email },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
  };

  const updatePassword = async (oldPassword, newPassword) => {
    await axios.post(
      "http://localhost:8000/api/v1/users/change-password",
      { oldPassword, newPassword },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
  };

  const updateCoverImage = async (coverImage) => {
    const formData = new FormData();
    formData.append("coverImage", coverImage);
    await axios.post(
      "http://localhost:8000/api/v1/users/cover-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`, 
        },
      }
    );
  };

  const updateAvatar = async (avatar) => {
    const formData = new FormData();
    formData.append("avatar", avatar);
    await axios.post(
      "http://localhost:8000/api/v1/users/avatar",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  };

  return (
    <>
    <Header />
    <div className="h-fit w-full flex flex-col justify-center items-center bg-gray-900 p-5 mt-10">
      <h1 className="text-4xl p-3 text-white font-bold hover:text-purple-700">
        Edit Profile
      </h1>
      <div className="w-full max-w-md bg-gray-800 p-5 rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="oldPassword">
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="newPassword">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="coverImage">
              Change Cover Image
            </label>
            <input
              type="file"
              id="coverImage"
              name="coverImage"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="avatar">
              Change Avatar
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-700"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-purple-700 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default Edit_Profile;
