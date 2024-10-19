import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Forget_password_email() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Get the navigate function for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://backtube-1.onrender.com/api/v1/users/email",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const id = response.data.data;
      navigate(`/forget_password/${id}`); // Navigate to the Forget_password_setPassword page with the received ID
      
    } catch (error) {
      console.error("Request failed:", error);
      // Handle error, possibly show an error message
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-900 justify-center items-center">
      <h1 className="m-2 text-4xl hover:underline  duration-700 font-extrabold text-purple-700">
        Verify The Email
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

          <button
            type="submit"
            className="p-2 mx-auto hover:bg-purple-600 w-1/2 bg-purple-700 rounded-xl text-lg m-1 font-bold text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Forget_password_email;
