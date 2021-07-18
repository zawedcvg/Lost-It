import React, { useState } from "react";
import LoginPageCSS from "../styles/LoginPage.module.css";
import MetaTags from "react-meta-tags";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { dispatchLogin } from "../redux/actions/authAction";
import { useDispatch } from "react-redux";
// import { GoogleLogin } from "react-google-login";
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://lost-it.herokuapp.com/user/login", {
                email,
                password,
            });
            setUser({ ...user, err: "", success: res.data.msg });

            localStorage.setItem("firstLogin", true);

            dispatch(dispatchLogin());
            history.push("/userdashboard");
        } catch (err) {
            console.log(err);
        }
    };

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
        <div className={LoginPageCSS.LoginPage}>
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
                                value={email}
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
                                value={password}
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

                <br />
                <span> New User? </span>
                <Link className={LoginPageCSS.sign_up} to="/register">
                    Sign Up here
                </Link>
                <br />
                <br />
                <Link className={LoginPageCSS.forgot} to="/forgotpassword">
                    Forgot your password?
                </Link>
            </div>
            <br />

            {/* <div className={LoginPageCSS.social}>
                <GoogleLogin
                    clientId="209721098919-5joiqq888tl1vd0uh0434tolb0jrnrnc.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                /> */}

            {/* <FacebookLogin
            appId="Your facebook app id"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            /> */}
            {/* </div> */}
        </div>
    );
}

export default LoginPage;
