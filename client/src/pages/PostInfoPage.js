import Post from "./Post";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import PostInfoPageCSS from "../styles/PostInfoPage.module.css";
import SuccessNotification from "../notifications/SuccessNotification";
import ErrorNotification from "../notifications/ErrorNotification";

const PostInfoPage = () => {
    const [item, setItem] = useState({});
    const [isOwner, setIsOwner] = useState(false);
    const [isLost, setIsLost] = useState("");
    const [liked, setLiked] = useState("");
    const [saved, setSaved] = useState("");
    const { id } = useParams();
    const history = useHistory();
    const [err, setErr] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        axios
            .post("/user/refresh_token")
            .then((response) => {
                axios
                    .get(`/listings/post/${id}`, {
                        headers: {
                            Authorization: response.data.access_token,
                        },
                    })
                    .then((res) => {
                        axios
                            .get("/user/info", {
                                headers: {
                                    Authorization: response.data.access_token,
                                },
                            })
                            .then((user) => {
                                if (user.data.saved.includes(id.toString())) {
                                    setSaved(true);
                                } else {
                                    setSaved(false);
                                }
                                if (res.data.post.user === user.data._id) {
                                    setIsOwner(true);
                                } else {
                                    setIsOwner(false);
                                }
                                if (
                                    res.data.post.likes.includes(user.data._id)
                                ) {
                                    setLiked(true);
                                } else {
                                    setLiked(false);
                                }
                                setItem(res.data.post);
                                setIsLost(res.data.post.isLost);
                            })
                            .catch((error) => setErr(error.response.data.msg));
                    })
                    .catch((error) => setErr(error.response.data.msg));
            })
            .catch((error) => setErr(error.response.data.msg));
    }, [saved, isLost, liked, id]);

    const handleDelete = () => {
        axios
            .post("/user/refresh_token")
            .then((response) => {
                if (
                    window.confirm("Are you sure you want to delete this post?")
                ) {
                    axios
                        .delete(`/listings/post/${id}`, {
                            headers: {
                                Authorization: response.data.access_token,
                            },
                        })
                        .then((res) => {
                            setSuccess(res.data.msg);
                        })
                        .catch((error) => setErr(error.response.data.msg));
                }
            })
            .catch((error) => setErr(error.response.data.msg));

        history.push("/listings");
    };

    const handleUpdatePost = () => {
        history.push(`/updatepost/${id}`);
    };

    const handleSave = () => {
        axios
            .post("/user/refresh_token")
            .then((response) => {
                axios
                    .get("/user/info", {
                        headers: {
                            Authorization: response.data.access_token,
                        },
                    })
                    .then((r) => {
                        axios
                            .patch(
                                `/listings/savepost/${id}`,
                                { user: r.data._id },
                                {
                                    headers: {
                                        Authorization:
                                            response.data.access_token,
                                    },
                                }
                            )
                            .then((res) => {
                                setSuccess(res.data.msg);
                            })
                            .catch((error) => setErr(error.response.data.msg));
                    })
                    .catch((error) => setErr(error.response.data.msg));
            })
            .catch((error) => setErr(error.response.data.msg));
        setSaved(true);
    };

    const handleUnsave = () => {
        axios
            .post("/user/refresh_token")
            .then((response) => {
                axios
                    .get("/user/info", {
                        headers: {
                            Authorization: response.data.access_token,
                        },
                    })
                    .then((r) => {
                        axios
                            .patch(
                                `/listings/unsavepost/${id}`,
                                { user: r.data._id },
                                {
                                    headers: {
                                        Authorization:
                                            response.data.access_token,
                                    },
                                }
                            )
                            .then((res) => {
                                setSuccess(res.data.msg);
                            })
                            .catch((error) => setErr(error.response.data.msg));
                    })
                    .catch((error) => setErr(error.response.data.msg));
            })
            .catch((error) => setErr(error.response.data.msg));
        setSaved(false);
    };

    const handleChangeStatus = () => {
        axios
            .post("/user/refresh_token")
            .then((response) => {
                axios
                    .patch(
                        `/listings/changestatus/${id}`,
                        { post: id },
                        {
                            headers: {
                                Authorization: response.data.access_token,
                            },
                        }
                    )
                    .then((res) => {
                        setSuccess(res.data.msg);
                    })
                    .catch((error) => setErr(error.response.data.msg));
            })
            .catch((error) => setErr(error.response.data.msg));
        setIsLost(false);
    };

    const handleRevertStatus = () => {
        axios
            .post("/user/refresh_token")
            .then((response) => {
                axios
                    .patch(
                        `/listings/revertstatus/${id}`,
                        { post: id },
                        {
                            headers: {
                                Authorization: response.data.access_token,
                            },
                        }
                    )
                    .then((res) => {
                        setSuccess(res.data.msg);
                    })
                    .catch((error) => setErr(error.response.data.msg));
            })
            .catch((error) => setErr(error.response.data.msg));
        setIsLost(true);
    };

    const handleLikePost = () => {
        axios
            .post("/user/refresh_token")
            .then((response) => {
                axios
                    .get("/user/info", {
                        headers: {
                            Authorization: response.data.access_token,
                        },
                    })
                    .then((r) => {
                        axios
                            .patch(
                                `/listings/post/${id}/like`,
                                {},
                                {
                                    headers: {
                                        Authorization:
                                            response.data.access_token,
                                    },
                                }
                            )
                            .then((res) => {
                                setSuccess(res.data.msg);
                                setLiked(true);
                            })
                            .catch((error) => setErr(error.response.data.msg));
                    })
                    .catch((error) => setErr(error.response.data.msg));
            })
            .catch((error) => setErr(error.response.data.msg));
    };

    const handleUnlikePost = () => {
        axios
            .post("/user/refresh_token")
            .then((response) => {
                axios
                    .get("/user/info", {
                        headers: {
                            Authorization: response.data.access_token,
                        },
                    })
                    .then((r) => {
                        axios
                            .patch(
                                `/listings/post/${id}/unlike`,
                                {},
                                {
                                    headers: {
                                        Authorization:
                                            response.data.access_token,
                                    },
                                }
                            )
                            .then((res) => {
                                setSuccess(res.data.msg);
                                setLiked(false);
                            })
                            .catch((error) => setErr(error.response.data.msg));
                    })
                    .catch((error) => setErr(error.response.data.msg));
            })
            .catch((error) => setErr(error.response.data.msg));
    };

    return (
        <div className={PostInfoPageCSS.PostInfoPage}>
            <h1 className={PostInfoPageCSS.heading}>Post Info</h1>
            <nav className={PostInfoPageCSS.navigation} role="navigation">
                <ul>
                    <li>
                        <img
                            className={PostInfoPageCSS.img1}
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
            <div className={PostInfoPageCSS.post_info}>
                <Post
                    key={item._id}
                    name={item.name}
                    type={item.type}
                    img={item.img}
                    date={item.date}
                    time={item.time}
                    location={item.location}
                    description={item.description}
                    likes={item.likes.length || 0}
                    link={item._id}
                />
            </div>

            {
                <div className={PostInfoPageCSS.centre_stage}>
                    <div>
                    {err && <ErrorNotification msg={err} />}
                    {success && <SuccessNotification msg={success} />}
                    </div>
                </div>
            }

            <div className={PostInfoPageCSS.non_owner}>
                {!saved ? (
                    <button
                        className={PostInfoPageCSS.btn_post}
                        onClick={handleSave}
                    >
                        Save Post
                    </button>
                ) : (
                    <button
                        className={PostInfoPageCSS.btn_post}
                        onClick={handleUnsave}
                    >
                        Unsave Post
                    </button>
                )}
                {liked ? (
                    <button
                        onClick={handleUnlikePost}
                        className={PostInfoPageCSS.btn_post}
                    >
                        Unlike Post
                    </button>
                ) : (
                    <button
                        onClick={handleLikePost}
                        className={PostInfoPageCSS.btn_post}
                    >
                        Like Post
                    </button>
                )}
            </div>
            <fieldset className={PostInfoPageCSS.owner_rights}>
                <legend>Owner Rights</legend>
                {isOwner ? (
                    isLost ? (
                        <button
                            className={PostInfoPageCSS.btn_post}
                            onClick={handleChangeStatus}
                        >
                            Change status (to recovered)
                        </button>
                    ) : (
                        <button
                            className={PostInfoPageCSS.btn_post}
                            onClick={handleRevertStatus}
                        >
                            Revert status (to lost)
                        </button>
                    )
                ) : (
                    <span></span>
                )}

                {isOwner ? (
                    <div>
                        <button
                            className={`${PostInfoPageCSS.btn_post} ${PostInfoPageCSS.delete_btn}`}
                            onClick={handleDelete}
                        >
                            Delete Post
                        </button>
                        <button
                            className={PostInfoPageCSS.btn_post}
                            onClick={handleUpdatePost}
                        >
                            Update Post
                        </button>
                    </div>
                ) : (
                    <span></span>
                )}
            </fieldset>

            <button
                className={PostInfoPageCSS.btn_post}
                onClick={(e) => history.push("/listings")}
            >
                Go back to listings
            </button>
        </div>
    );
};

export default PostInfoPage;
