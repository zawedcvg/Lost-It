import React, { useState } from "react";
import LoginPageCSS from "../styles/LoginPage.module.css";
import MetaTags from "react-meta-tags";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
//import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import { dispatchLogin } from "../redux/actions/authAction";
import { useDispatch } from "react-redux";
// import { GoogleLogin } from 'react-google-login';
// import FacebookLogin from 'react-facebook-login';

const initialState = {
    email: "",
    password: "",
    err: "",
    success: "",
};

function LoginPage() {
    const [user, setUser] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const { email, password, err, success } = user;

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value, err: "", success: "" });
        console.log(user);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/user/login", { email, password });
            setUser({ ...user, err: "", success: res.data.msg });
            
            localStorage.setItem("firstLogin", true);

            dispatch(dispatchLogin());
            history.push("/userdashboard");
        } catch (err) {
            err.response.data.msg &&
                setUser({ ...user, err: err.response.data.msg, success: "" });
        }
    };

    // const handleSignUpClick = () => {
    //     history.push("/register")
    // }

    // const responseGoogle = async (response) => {
    //     try {
    //         const res = await axios.post("/user/google_login", {
    //             tokenId: response.tokenId,
    //         });

    //         setUser({ ...user, error: "", success: res.data.msg });
    //         localStorage.setItem("firstLogin", true);

    //         dispatch(dispatchLogin());
    //         history.push("/");
    //     } catch (err) {
    //         err.response.data.msg &&
    //             setUser({ ...user, err: err.response.data.msg, success: "" });
    //     }
    // };

    // const responseFacebook = async (response) => {
    //     try {
    //         const { accessToken, userID } = response;
    //         const res = await axios.post("/user/facebook_login", {
    //             accessToken,
    //             userID,
    //         });

    //         setUser({ ...user, error: "", success: res.data.msg });
    //         localStorage.setItem("firstLogin", true);

    //         dispatch(dispatchLogin());
    //         history.push("/");
    //     } catch (err) {
    //         err.response.data.msg &&
    //             setUser({ ...user, err: err.response.data.msg, success: "" });
    //     }
    // };

    return (
        <div className="LoginPage">
            <MetaTags>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, 
    initial-scale = 1.0"
                />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <title>Document</title>
            </MetaTags>
            <div className={LoginPageCSS.scroll}>
                <h1 className={LoginPageCSS.login}>Log In</h1>
                <div className={LoginPageCSS.form_list}>
                    <form
                        formAction="signin"
                        method="post"
                        onSubmit={handleSubmit}
                    >
                        <label className={LoginPageCSS.login_label}>
                            Email Address:{" "}
                            <input
                                className={LoginPageCSS.login_input}
                                name="email"
                                type="text"
                                onChange={handleChangeInput}
                                required
                            />
                        </label>
                        <label
                            className={`${LoginPageCSS.password} ${LoginPageCSS.login_label}`}
                        >
                            Password:{" "}
                            <input
                                className={LoginPageCSS.login_input}
                                name="password"
                                onChange={handleChangeInput}
                                type="password"
                                required
                            />
                        </label>

                        <button
                            className={LoginPageCSS.btn_login}
                            type="form"
                            id="something"
                        >
                            Log In
                        </button>
                    </form>
                </div>
                <span>New User? </span>
                <Link className={LoginPageCSS.sign_up} to="/register">
                    Sign Up here
                </Link>
                <br />
                <br />
                <Link className={LoginPageCSS.forgot} to="/forgot">
                    Forgot your password?
                </Link>
            </div>
        </div>
        // {/* <div className="social">
        //         <GoogleLogin
        //             clientId="Your google client id"
        //             buttonText="Login with google"
        //             onSuccess={responseGoogle}
        //             cookiePolicy={'single_host_origin'}
        //         />

        //         <FacebookLogin
        //         appId="Your facebook app id"
        //         autoLoad={false}
        //         fields="name,email,picture"
        //         callback={responseFacebook}
        //         />

        //     </div> */}
    );
}

export default LoginPage;
