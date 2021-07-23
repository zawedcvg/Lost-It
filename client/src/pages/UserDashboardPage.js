import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { useHistory } from "react-router-dom";
import UserDashboardPageCSS from "../styles/UserDashboardPage.module.css";
import userprofile from "../images/userprofile.png";
import SuccessNotification from "../notifications/SuccessNotification";
import ErrorNotification from "../notifications/ErrorNotification";
import InfoNotification from "../notifications/InfoNotification";

function UserDashBoardPage() {
    const [user, setUser] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [err, setErr] = useState("");
    const [success, setSuccess] = useState("");
    const [message, setMessage] = useState("");

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
                        if (res.data.role === 1) {
                            setIsAdmin(true);
                        } else {
                            setIsAdmin(false);
                        }
                        setUser(res.data);
                    })
                    .catch((error) => setErr(error.response.data.msg));
            })
            .catch((error) => setErr(error.response.data.msg));
    }, [isAdmin]);

    const handleDeleteUser = () => {
        axios
            .post("/user/refresh_token")
            .then((res) => {
                if (
                    window.confirm(
                        "Are you sure you want to delete this account?"
                    )
                ) {
                    axios
                        .delete(`/user/delete/${user._id}`, {
                            headers: {
                                Authorization: res.data.access_token,
                            },
                        })
                        .then((response) => {
                            setSuccess(response.data.msg);
                            history.push("/");
                        })
                        .catch((error) => setErr(error.response.data.msg));
                }
            })
            .catch((error) => setErr(error.response.data.msg));
    };

    // const handleRequest = () => {
    //     console.log("here1")
    //     axios.post("/user/refresh_token")
    //         .then(res => {
    //             axios.post(`/requestadmin/${user._id}`, {
    //                 headers : {
    //                     Authorization : res.data.access_token
    //                 }
    //             })
    //             .then(resp => {
    //                 alert(resp.data.msg)
    //             })
    //             .catch(err => console.log(err));
    //         })
    //         .catch(err => console.log(err))
    // }

    const handleRevertStatusToBasicUser = () => {
        if (
            window.confirm(
                "Are you sure you want to change your status tp basic user?"
            )
        ) {
            axios
                .post("/user/refresh_token")
                .then((res) => {
                    axios
                        .patch(
                            `/user/update_role/${user._id}`,
                            { role: 0 },
                            {
                                headers: {
                                    Authorization: res.data.access_token,
                                },
                            }
                        )
                        .then((response) => {
                            setSuccess(response.data.msg);
                        })
                        .catch((error) => setErr(error.response.data.msg));
                })
                .catch((error) => setErr(error.response.data.msg));
            setIsAdmin(false);
        }
    };

    const handleGetAllUsers = () => {
        axios
            .post("/user/refresh_token")
            .then((res) => {
                axios
                    .get(`/user/completeinfo`, {
                        headers: {
                            Authorization: res.data.access_token,
                        },
                    })
                    .then((response) => {
                        setMessage(
                            "Please check your console for all the info"
                        );
                        console.log(response.data.users);
                    })
                    .catch((error) => setErr(error.response.data.msg));
            })
            .catch((error) => setErr(error.response.data.msg));
    };

    const handleLogout = async (e) => {
        try {
            if (window.confirm("Are you sure you want to logout?")) {
                const res = await axios.post("/user/logout");
                localStorage.removeItem("firstLogin");
                localStorage.removeItem("refreshtoken");
                setSuccess(res.data.msg);
                history.push("/logout");
            }
        } catch (err) {
            setErr(err.response.data.msg);
        }
    };

    return (
        <div className={UserDashboardPageCSS.UserDashboardPage}>
            <nav className={UserDashboardPageCSS.navigation} role="navigation">
                <ul>
                    <li>
                        <img
                            className={UserDashboardPageCSS.img1}
                            src="https://image.flaticon.com/icons/png/512/78/78075.png"
                            alt="thing"
                        />
                        <ul class="dropdown">
                            <li>
                                <Link to={`/listings`}>Listings</Link> <br />
                            </li>
                            <li>
                                <Link to={`/userdashboard`}>Dashboard</Link>{" "}
                                <br />
                            </li>
                            <li>
                                <Link to={`/reportitem`}>Report An Item</Link>{" "}
                            </li>
                            <li>
                                <Link to={`/myposts`}>My Posts</Link> <br />
                            </li>
                            <li>
                                <Link to={`/savedposts`}>Saved Posts</Link>{" "}
                                <br />
                            </li>
                            <li>
                                <Link to={`/logout`}>Logout</Link> <br />
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
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
                            className={UserDashboardPageCSS.profile}
                            src={userprofile}
                            alt="Profile"
                        />
                        {
                            <div>
                                {err && <ErrorNotification msg={err} />}
                                {success && (
                                    <SuccessNotification msg={success} />
                                )}
                                {message && <InfoNotification msg={message} />}
                            </div>
                        }
                        <form className={UserDashboardPageCSS.side}>
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
                            {
                                //<button
                                //className={UserDashboardPageCSS.btn_entry}
                                //onClick={(e) => history.push("/myposts")}
                                //>
                                //View my posts
                                //</button>
                                //<button
                                //className={UserDashboardPageCSS.btn_entry}
                                //onClick={(e) => history.push("/savedposts")}
                                //>
                                //View saved posts
                                //</button>
                            }
                            {/* {
                                !isAdmin ? (
                                    <button
                                        className={UserDashboardPageCSS.btn_entry}
                                        onClick={handleRequest}
                                    >
                                        Request admin access
                                    </button>
                                ) : <span></span>
                            } */}
                            {isAdmin ? (
                                <div
                                    className={
                                        UserDashboardPageCSS.admin_things
                                    }
                                >
                                    <button
                                        className={
                                            UserDashboardPageCSS.btn_entry
                                        }
                                        onClick={handleDeleteUser}
                                    >
                                        Delete user
                                    </button>
                                    <button
                                        className={
                                            UserDashboardPageCSS.btn_entry
                                        }
                                        onClick={handleGetAllUsers}
                                    >
                                        Get info about all the users
                                    </button>
                                    <button
                                        className={
                                            UserDashboardPageCSS.btn_entry
                                        }
                                        onClick={handleRevertStatusToBasicUser}
                                    >
                                        Revert my status to basic user
                                    </button>
                                </div>
                            ) : (
                                <span></span>
                            )}
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
                        <div className={UserDashboardPageCSS.bottom_btn}>
                            <button
                                onClick={handleLogout}
                                className={`${UserDashboardPageCSS.btn_entry} ${UserDashboardPageCSS.logout}`}
                            >
                                Logout
                            </button>
                            <button
                                onClick={(e) =>
                                    history.push("/edituserdetails")
                                }
                                className={UserDashboardPageCSS.btn_entry}
                            >
                                Edit Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDashBoardPage;
