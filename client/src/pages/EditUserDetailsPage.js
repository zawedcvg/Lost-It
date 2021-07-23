import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import MetaTags from "react-meta-tags";
import EditUserDetailsPageCSS from "../styles/EditUserDetailsPage.module.css";
import SuccessNotification from "../notifications/SuccessNotification";
import ErrorNotification from "../notifications/ErrorNotification";

const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    err: "",
    success: "",
};

const isMatch = (password, confirmPassword) => {
    if (password === confirmPassword) return true;
    return false;
};

const isSmall = (password) => {
    if (password.length < 6) return true;
    return false;
};

function EditUserDetailsPage() {
    const history = useHistory();
    const [user, setUser] = useState({});
    const [details, setDetails] = useState(initialState);

    const { name, email, password, confirmPassword } = details;

    useEffect(() => {
        axios
            .post("/user/refresh_token")
            .then((res) => {
                axios
                    .get("/user/info", {
                        headers: {
                            Authorization: res.data.access_token,
                        },
                    })
                    .then((r) => {
                        setUser(r.data);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }, []);

    const updateInfo = () => {
        axios
            .post("/user/refresh_token")
            .then((res) => {
                axios
                    .patch(
                        "/user/update",
                        {
                            name: details.name ? details.name : user.name,
                            email: details.email ? details.email : user.email,
                        },
                        {
                            headers: {
                                Authorization: res.data.access_token,
                            },
                        }
                    )
                    .then((r) => {
                        setDetails({
                            ...details,
                            err: "",
                            success: r.data.msg,
                        });
                    })
                    .catch((error) =>
                        setDetails({
                            ...details,
                            err: error.response.data.msg,
                            success: "",
                        })
                    );
            })
            .catch((error) =>
                setDetails({
                    ...details,
                    err: error.response.data.msg,
                    success: "",
                })
            );
    };

    const updatePassword = () => {
        if (isSmall(password)) {
            alert("Password must be atleast 6 characters");
            return setDetails({
                ...details,
                err: "Password must be at least 6 characters.",
                success: "",
            });
        }

        if (!isMatch(password, confirmPassword)) {
            alert("Passwords do not match");
            return setDetails({
                ...details,
                err: "Password did not match.",
                success: "",
            });
        }

        axios
            .post("/user/refresh_token")
            .then((res) => {
                axios
                    .post(
                        "/user/reset",
                        { password: password },
                        {
                            headers: {
                                Authorization: res.data.access_token,
                            },
                        }
                    )
                    .then((r) => {
                        setDetails({
                            ...details,
                            err: "",
                            success: r.data.msg,
                        });
                    })
                    .catch((error) =>
                        setDetails({
                            ...details,
                            err: error.response.data.msg,
                            success: "",
                        })
                    );
            })
            .catch((error) =>
                setDetails({
                    ...details,
                    err: error.response.data.msg,
                    success: "",
                })
            );
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails({ ...details, [name]: value, err: "", success: "" });
    };

    const handleUpdate = () => {
        if (name || email) updateInfo();
        if (password) updatePassword();
    };

    return (
        <div className={EditUserDetailsPageCSS.EditUserDetailsPage}>
            <MetaTags>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, 
        initial-scale = 1.0"
                />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <title>Edit User Details</title>
            </MetaTags>
            <div className={EditUserDetailsPageCSS.scroll}>
                <div className={EditUserDetailsPageCSS.container}>
                    <h1 className={EditUserDetailsPageCSS.edit_details}>
                        Edit user details
                    </h1>
                    {
                        //<p className={EditUserDetailsPageCSS.prev_details}>
                        //User Details <br />
                        //{user.name}
                        //{user.email}
                        //</p>
                    }
                    {
                        <div>
                            {details.err && (
                                <ErrorNotification msg={details.err} />
                            )}
                            {details.success && (
                                <SuccessNotification msg={details.success} />
                            )}
                        </div>
                    }

                    <form>
                        <label
                            className={EditUserDetailsPageCSS.label_edit_user}
                            for="name"
                        >
                            Name :
                            <input
                                className={
                                    EditUserDetailsPageCSS.input_user_details
                                }
                                value={details.name}
                                onChange={handleChange}
                                name="name"
                                placeholder={user.name}
                                type="text"
                            />
                        </label>
                        <label
                            className={EditUserDetailsPageCSS.label_edit_user}
                            for="email"
                        >
                            Email :
                            <input
                                className={
                                    EditUserDetailsPageCSS.input_user_details
                                }
                                value={details.email}
                                onChange={handleChange}
                                name="email"
                                placeholder={user.email}
                                type="email"
                                readOnly
                            />
                        </label>
                        <label
                            className={EditUserDetailsPageCSS.label_edit_user}
                            for="email"
                        >
                            Password :
                            <input
                                className={
                                    EditUserDetailsPageCSS.input_user_details
                                }
                                value={details.password}
                                onChange={handleChange}
                                name="password"
                                type="password"
                            />
                        </label>
                        <label
                            className={EditUserDetailsPageCSS.label_edit_user}
                            for="email"
                        >
                            Confirm password :
                            <input
                                className={
                                    EditUserDetailsPageCSS.input_user_details
                                }
                                type="password"
                                value={details.confirmPassword}
                                onChange={handleChange}
                                name="confirmPassword"
                            />
                        </label>
                    </form>
                    <button
                        onClick={handleUpdate}
                        className={EditUserDetailsPageCSS.btn_edit_user}
                    >
                        Apply Changes
                    </button>
                    <button
                        onClick={(e) => history.push("/userdashboard")}
                        className={EditUserDetailsPageCSS.btn_edit_user}
                    >
                        Discard Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditUserDetailsPage;
