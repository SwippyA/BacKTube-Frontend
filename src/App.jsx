import { useState, useEffect } from "react";
// import "./App.css";
import axios from "axios";
import Register from "./Register/Register";
import Login from "./Login/Login";
// import Toaster from "react-hot-toast"
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

function App() {
  // const [userData, setUserData] = useState(null); // State to hold user data

  // useEffect(() => {
  //   // useEffect to handle side effects, such as fetching data
  //   axios
  //     .post("http://localhost:8000/api/v1/users/login", {
  //       username: "Rocky",
  //       email: "dsfdsfds@43",
  //       password: "3434343423",
  //     })
  //     .then(function (response) {
  //       // This function is executed when the request is successful
  //       const userData = response.data.data.user; // Extracting user data
  //       setUserData(userData); // Updating userData state with extracted user data
  //     })
  //     .catch(function (error) {
  //       // This function is executed when there is an error in the request
  //       console.error(error);
  //     });
  // }, []); // Empty dependency array to run effect only once on component mount

  return (
    <>
      {/* {userData ? ( // Conditional rendering: Render if userData is not null
        <div>
          <div>Username: {userData.username}</div>
          <div>Email: {userData.email}</div>

          <img src={userData.avatar} alt="no" />
        </div>
      ) : (
        <div>Loading user data...</div>
      )} */}
      {/* <Register/> */}
      {/* <h1>hi shubhankar </h1> */}
      <Outlet />
      <Toaster position="top-right" reverseOrder={false} />
      {/* <Login/> */}
    </>
  );
}

export default App;
