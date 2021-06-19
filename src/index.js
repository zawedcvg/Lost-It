import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
//import App from './App.jsx';
// import Login from './screens/Login.jsx';
import Register from "./Screens/Register.jsx";
import Activate from "./Screens/Activate.jsx";
// import Private from './screens/Private.jsx';
// import Admin from './screens/Admin.jsx';
// import ForgetPassword from './screens/ForgetPassword.jsx';
// import ResetPassword from './screens/ResetPassword.jsx';

// import PrivateRoute from './Routes/PrivateRoute';
// import AdminRoute from './Routes/AdminRoute';
import "react-toastify/dist/ReactToastify.css";
ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route
                path="/register"
                exact
                render={(props) => <Register {...props} />}
            />
            <Route
                path="/users/activate/:token"
                exact
                render={(props) => <Activate {...props} />}
            />
            <Redirect to="/" />
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);
