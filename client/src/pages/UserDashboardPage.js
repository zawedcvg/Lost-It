import React, { useState, useEffect } from "react";
import axios from "axios";
import MetaTags from "react-meta-tags";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import UserDashboardPageCSS from "../styles/UserDashboardPage.module.css";
import userprofile from "../images/userprofile.png";

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
    const [user, setUser] = useState({});

    const history = useHistory();

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

    const handleLogout = async (e) => {
        try {
            const res = await axios.post("/user/logout");
            localStorage.removeItem("firstLogin");

            history.push("/logout");
        } catch (err) {
            console.log("errrrr");
            //window.location.href = "/logout";
        }
    };

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
                        <img src={userprofile} alt="Profile" />
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
                            <span className={UserDashboardPageCSS.details}>
                                Name:
                            </span>{" "}
                            <br />
                            {user.name}
                            <br />
                            <span className={UserDashboardPageCSS.details}>
                                Email: <br />
                            </span>
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
