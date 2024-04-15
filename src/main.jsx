import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Register from "./Register/Register.jsx";
import Login from "./Login/Login.jsx";
import Home from "./Home/Home.jsx";

const routers = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="register" element={<Register />} />
      <Route path="" element={<Home />} />
      <Route path="login" element={<Login />}/>
      <Route path="*" element={<div>Page not found</div>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routers} />
  </React.StrictMode>
);
