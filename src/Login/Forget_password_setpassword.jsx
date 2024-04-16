import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Forget_password_setPassword() {
    const [newPassword, setNewPassword]=useState("")
    // What is the confirm password?
    const Navigate = useNavigate()
    const params =useParams()
    
    const [confirmPassword, setConfirmPassword]=useState("")
    const handleSubmit = async (e)=>{
        // const id = params.id
        e.preventDefault()
        if(newPassword!==confirmPassword){
            // throw console.error();
            alert("Passwords do not match")
        }
        
        try {
            // const id = params.id
            const response = await axios.post(
              `http://localhost:8000/api/v1/users/Forget_password/${params.id}`,
              { newPassword },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            console.log(response.data);
            // const id = response.a.data.data;
            Navigate("/login"); // Navigate to the Forget_password_setPassword page with the received ID
            
          } catch (error) {
            console.error("Request failed:", error);
            // Handle error, possibly show an error message
          }
      

        
    }
  return (
    <div className="w-screen h-screen flex flex-col bg-gray-900 justify-center items-center">
    <h1 className="m-2 text-4xl hover:underline  duration-700 font-extrabold text-purple-700">
      Set New Password
    </h1>
    <div className="w-[400px] h-fit bg-gray-800 rounded-xl">
      <form onSubmit={handleSubmit} className="flex flex-col w-full p-5">
        <input
          type="Password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
          className="p-2 bg-purple-700 text-lg focus:text-white m-1 rounded-xl font-bold"
          placeholder="New Password"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          className="p-2 bg-purple-700 focus:text-white m-1 rounded-xl text-lg font-bold"
          placeholder="Confirm Password"
          required
        />
        

        <button
          type="submit"
          className="p-2 mx-auto hover:bg-purple-600 w-1/2 bg-purple-700 rounded-xl text-lg m-1 font-bold text-white"
        >
          Login
        </button>
        
      </form>
    </div>
    {/* <Outlet/> */}
  </div>
  )
}

export default Forget_password_setPassword