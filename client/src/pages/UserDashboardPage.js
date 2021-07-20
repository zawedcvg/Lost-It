import React, { useState, useEffect } from "react";
import axios from "axios";
import MetaTags from "react-meta-tags";
import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import UserDashboardPageCSS from "../styles/UserDashboardPage.module.css";

const isSmall = (password) => {
    if (password.length < 6) return true;
    return false;
};

const isMatch = (password, cf_password) => {
    if (password === cf_password) return true;
    return false;
};

const initialState = {
    name: "",
    password: "",
    cf_password: "",
    err: "",
    success: "",
};

function UserDashBoardPage() {
    const auth = useSelector((state) => state.auth);
    const token = useSelector((state) => state.token);

    const users = useSelector((state) => state.users);

    // const { user, isAdmin } = auth;
    const [user, setUser] = useState({});
    const [data, setData] = useState(initialState);
    const { name, password, cf_password, err, success } = data;

    const history = useHistory();

    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .post("/user/refresh_token")
            .then((response) => {
                axios
                    .get("/user/info", {
                        headers: {
                            Authorization: response.data.access_token,
                        },
                    })
                    .then((res) => {
                        setUser(res.data);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }, []);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setData({ ...data, [name]: value, err: "", success: "" });
    // };

    // const changeAvatar = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const file = e.target.files[0];

    //         if (!file)
    //             return setData({
    //                 ...data,
    //                 err: "No files were uploaded.",
    //                 success: "",
    //             });

    //         if (file.size > 1024 * 1024)
    //             return setData({
    //                 ...data,
    //                 err: "Size too large.",
    //                 success: "",
    //             });

    //         if (file.type !== "image/jpeg" && file.type !== "image/png")
    //             return setData({
    //                 ...data,
    //                 err: "File format is incorrect.",
    //                 success: "",
    //             });

    //         let formData = new FormData();
    //         formData.append("file", file);

    //         setLoading(true);
    //         const res = await axios.post("/api/upload_avatar", formData, {
    //             headers: {
    //                 "content-type": "multipart/form-data",
    //                 Authorization: token,
    //             },
    //         });

    //         setLoading(false);
    //         setAvatar(res.data.url);
    //     } catch (err) {
    //         setData({ ...data, err: err.response.data.msg, success: "" });
    //     }
    // };

    // const updateInfo = () => {
    //     try {
    //         axios.patch(
    //             "/user/update",
    //             {
    //                 name: name ? name : user.name,
    //                 avatar: avatar ? avatar : user.avatar,
    //             },
    //             {
    //                 headers: { Authorization: token },
    //             }
    //         );

    //         setData({ ...data, err: "", success: "Updated Success!" });
    //     } catch (err) {
    //         setData({ ...data, err: err.response.data.msg, success: "" });
    //     }
    // };

    const handleLogout = async (e) => {
        try {
            console.log(1);

            console.log(2);
            const res = await axios.post("/user/logout");
            console.log(res);
            localStorage.removeItem("firstLogin");
            // window.location.href = "/logout";

            console.log(3);

            history.push("/logout");
        } catch (err) {
            console.log("errrrr");
            //window.location.href = "/logout";
        }
    };

    // const updatePassword = () => {
    //     if (isSmall(password))
    //         return setData({
    //             ...data,
    //             err: "Password must be at least 6 characters.",
    //             success: "",
    //         });

    //     if (!isMatch(password, cf_password))
    //         return setData({
    //             ...data,
    //             err: "Password did not match.",
    //             success: "",
    //         });

    //     try {
    //         axios.post(
    //             "/user/reset",
    //             { password },
    //             {
    //                 headers: { Authorization: token },
    //             }
    //         );

    //         setData({ ...data, err: "", success: "Updated Success!" });
    //     } catch (err) {
    //         setData({ ...data, err: err.response.data.msg, success: "" });
    //     }
    // };

    // const handleUpdate = () => {
    //     if (name || avatar) updateInfor();
    //     if (password) updatePassword();
    // };

    const handletemp = () => {
        history.push("/");
    };

    // const handleDelete = async (id) => {
    //     try {
    //         if (user._id !== id) {
    //             if (
    //                 window.confirm(
    //                     "Are you sure you want to delete this account?"
    //                 )
    //             ) {
    //                 setLoading(true);
    //                 await axios.delete(`/user/delete/${id}`, {
    //                     headers: { Authorization: token },
    //                 });
    //                 setLoading(false);
    //                 setCallback(!callback);
    //             }
    //         }
    //     } catch (err) {
    //         setData({ ...data, err: err.response.data.msg, success: "" });
    //     }
    // };

    return (
        <div className={UserDashboardPageCSS.UserDashboardPage}>
            <MetaTags>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, 
    initial-scale = 1.0"
                />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <title>User</title>
            </MetaTags>
            <div className={UserDashboardPageCSS.scroll}>
                <h1 className={UserDashboardPageCSS.heading}>User Dashboard</h1>
                <div className={UserDashboardPageCSS.container}>
                    <div className={UserDashboardPageCSS.top}>
                        <img
                            src="https://source.unsplash.com/random/300x300"
                            alt="***random***"
                        />
                        <form className={UserDashboardPageCSS.side}>
                            <button
                                onClick={(e) =>
                                    history.push("/edituserdetails")
                                }
                                className={UserDashboardPageCSS.btn_entry}
                            >
                                Edit Details
                            </button>
                            <button
                                onClick={(e) => history.push("/listings")}
                                className={UserDashboardPageCSS.btn_entry}
                            >
                                View listings
                            </button>
                            <button
                                onClick={(e) => history.push("/reportitem")}
                                className={UserDashboardPageCSS.btn_entry}
                            >
                                Report item
                            </button>
                            <button
                                className={UserDashboardPageCSS.btn_entry}
                                onClick={(e) => history.push("/myposts")}
                            >
                                View my posts
                            </button>
                            <button
                                className={UserDashboardPageCSS.btn_entry}
                                onClick={(e) => history.push("/savedposts")}
                            >
                                View saved posts
                            </button>
                        </form>
                    </div>
                    <div
                        className={UserDashboardPageCSS.user_details}
                        id="userinfo"
                    >
                        <p id="userinfo">
                            {user.name}
                            <br />
                            {user.email}
                        </p>
                            <button
                                onClick={handleLogout}
                                className={`${UserDashboardPageCSS.btn_entry} ${UserDashboardPageCSS.logout}`}
                            >
                                Logout
                            </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDashBoardPage;
