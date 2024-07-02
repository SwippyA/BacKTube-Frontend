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
import Video from "./Home/Video.jsx";
import Home from "./Home/Home.jsx";
import History from "./Home/History.jsx"
import Forget_password_email from "./Login/Forget_password_email.jsx";
import Forget_password_setPassword from "./Login/Forget_password_setpassword.jsx";
import { store, persistor } from "../src/Store/Store.js";
import { Provider } from "react-redux";
import Account from "./Home/Account.jsx";
import User_Profile from "./Home/User_Profile.jsx";
import { PersistGate } from "redux-persist/integration/react";

const routers = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="forget_password" element={<Forget_password_email />} />
      <Route
        path="forget_password/:id"
        element={<Forget_password_setPassword />}
      />
      <Route path="account" element={<Account />} />
      <Route path="video/:id" element={<Video />} />
      <Route path="user/:id" element={<User_Profile />} />
      <Route path="history" element={<History />} />
      <Route path="*" element={<div>Page not found</div>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={routers} />
    </PersistGate>
  </Provider>
);
