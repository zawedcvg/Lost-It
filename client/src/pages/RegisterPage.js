import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import RegisterPageCSS from "../styles/RegisterPage.module.css";
import MetaTags from "react-meta-tags";
import { useHistory } from "react-router-dom";
import ErrorNotification from "../notifications/ErrorNotification";
import SuccessNotification from "../notifications/SuccessNotification";

const isEmpty = (value) => {
    if (!value) return true;
    return false;
};

const isEmail = (email) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isSmall = (password) => {
    if (password.length < 6) return true;
    return false;
};

const isMatch = (password, confirmPassword) => {
    if (password === confirmPassword) return true;
    return false;
};

const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    err: "",
    success: "",
};

const Register = () => {
    const [user, setUser] = useState(initialState);

    const { name, email, password, confirmPassword, err, success } = user;

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value, err: "", success: "" });
    };

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEmpty(name) || isEmpty(password)) {
            return setUser({
                ...user,
                err: "Please fill in all fields.",
                success: "",
            });
        }

        if (!isEmail(email)) {
            return setUser({
                ...user,
                err: "Invalid email address.",
                success: "",
            });
        }

        if (isSmall(password)) {
            return (
                setUser({
                    ...user,
                    err: "Password must be at least 6 characters.",
                    success: "",
                }) & console.log(user.err)
            );
        }

        if (!isMatch(password, confirmPassword)) {
            return (
                setUser({
                    ...user,
                    err: "Passwords did not match.",
                    success: "",
                }) & console.log(user.err)
            );
        }

        try {
            const res = await axios.post("/user/register", {
                name,
                email,
                password,
            });

            setUser({ ...user, err: "", success: res.data.msg });
            history.push("/emailhasbeensentforactivation");
        } catch (err) {
            err.response.data.msg &&
                setUser({ ...user, err: err.response.data.msg, success: "" });
        }
    };

    return (
        <div className={RegisterPageCSS.RegisterPage}>
            <MetaTags>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, 
                    initial-scale = 1.0"
                />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <title>Registration</title>
            </MetaTags>
            <div className={RegisterPageCSS.scroll}>
                <h1 className={RegisterPageCSS.signup}>Sign Up</h1>
                <div className={RegisterPageCSS.form_list}>
                    {
                        <div>
                            {err && <ErrorNotification msg={err} />}
                            {success && <SuccessNotification msg={success} />}
                        </div>
                    }
                    <form
                        formAction="signup"
                        onSubmit={handleSubmit}
                        method="post"
                        id="form"
                    >
                        <label className={RegisterPageCSS.label_reg}>
                            Name:
                            <input
                                className={RegisterPageCSS.input_reg}
                                onChange={handleChangeInput}
                                name="name"
                                type="text"
                                value={name}
                                id="name"
                            />
                        </label>
                        <label className={RegisterPageCSS.label_reg}>
                            Email Address:
                            <input
                                className={RegisterPageCSS.input_reg}
                                onChange={handleChangeInput}
                                name="email"
                                type="email"
                                id="email"
                                value={email}
                            />
                        </label>

                        <label
                            className={`${RegisterPageCSS.sideform} ${RegisterPageCSS.label_reg}`}
                            htmlFor="password"
                        >
                            Password:
                            <input
                                id="password"
                                value={password}
                                className={RegisterPageCSS.input_reg}
                                name="password"
                                onChange={handleChangeInput}
                                type="password"
                            />
                        </label>

                        <label
                            className={`${RegisterPageCSS.sideform} ${RegisterPageCSS.label_reg}`}
                            htmlFor="confirmPassword"
                        >
                            Confirm Password
                            <input
                                type="password"
                                className={RegisterPageCSS.input_reg}
                                id="confirmPassword"
                                value={confirmPassword}
                                name="confirmPassword"
                                onChange={handleChangeInput}
                            />
                        </label>

                        <button
                            className={RegisterPageCSS.btn}
                            type="form"
                            id="something"
                            style={{ color: "blue" }}
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
                <span className={RegisterPageCSS.account}>
                    Already have an account?{" "}
                </span>
                <Link className={RegisterPageCSS.sign_up} to="/login">
                    Login here
                </Link>
            </div>
        </div>
    );
};

export default Register;
