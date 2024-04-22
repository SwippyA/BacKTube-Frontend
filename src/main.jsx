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
import Forget_password_email from "./Login/Forget_password_email.jsx";
import Forget_password_setPassword from "./Login/Forget_password_setpassword.jsx";
import { store } from './Store/Store.js'
import { Provider } from 'react-redux'
import Account from "./Home/Account.jsx";

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
      <Route
        path="account"
        element={<Account />}
      />
      <Route path="*" element={<div>Page not found</div>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <Provider store={store}>
      <RouterProvider router={routers} />
    </Provider>
    
  
);
