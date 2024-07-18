import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function Forget_password_setPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Extract id correctly

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate if passwords match
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
  
    try {
      // Send POST request to update password
      const response = await axios.post(
        `http://localhost:8000/api/v1/users/Forget_password/${id}`,
        { newPassword }, // Corrected: Ensure newPassword is sent in the correct format
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      toast.success(response.data.message);
      navigate(`/login`); // Navigate to login page after password reset
    } catch (error) {
      console.error("Request failed:", error);
      toast.error("Failed to reset password");
    }
  };
  

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-900 justify-center items-center">
      <h1 className="m-2 text-4xl hover:underline duration-700 font-extrabold text-purple-700">
        Set New Password
      </h1>
      <div className="w-[400px] h-fit bg-gray-800 rounded-xl">
        <form onSubmit={handleSubmit} className="flex flex-col w-full p-5">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="p-2 bg-purple-700 text-lg focus:text-white m-1 rounded-xl font-bold"
            placeholder="New Password"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-2 bg-purple-700 focus:text-white m-1 rounded-xl text-lg font-bold"
            placeholder="Confirm Password"
            required
          />
          <button
            type="submit"
            className="p-2 mx-auto hover:bg-purple-600 w-1/2 bg-purple-700 rounded-xl text-lg m-1 font-bold text-white"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default Forget_password_setPassword;
