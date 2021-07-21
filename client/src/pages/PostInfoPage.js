import Post from "./Post";
import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import PostInfoPageCSS from "../styles/PostInfoPage.module.css";

const PostInfoPage = () => {
    const [item, setItem] = useState({});
    const [isOwner, setIsOwner] = useState(false);
    const [isLost, setIsLost] = useState("");
    const [saved, setSaved] = useState("");
    const { id } = useParams();
    const history = useHistory();

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
                        console.log(res);
                        axios
                            .get("/user/info", {
                                headers: {
                                    Authorization: response.data.access_token,
                                },
                            })
                            .then((user) => {
                                if (user.data.saved.includes(id.toString())) {
                                    setSaved(true);
                                    console.log("saved");
                                } else {
                                    setSaved(false);
                                }
                                if (res.data.post.user === user.data._id) {
                                    setIsOwner(true);
                                } else {
                                    setIsOwner(false);
                                }
                                setItem(res.data.post);
                                setIsLost(res.data.post.isLost);
                            })
                            .catch((err) => console.log(err));
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }, []);

    const handleDelete = () => {
        const res = axios
            .post("/user/refresh_token")
            .then((response) => {
                axios
                    .delete(`/listings/post/${id}`, {
                        headers: {
                            Authorization: response.data.access_token,
                        },
                    })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        console.log(res);
        history.push("/listings");
    };

    const handleUpdatePost = () => {
        history.push(`/updatepost/${id}`);
    };

    const handleSave = () => {
        const res = axios
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
                                alert(res.data.msg);
                                console.log(res);
                            })
                            .catch((err) => console.log(err));
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        setSaved(true);
        console.log(res);
    };

    const handleUnsave = () => {
        const res = axios
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
                                alert(res.data.msg);
                                console.log(res);
                            })
                            .catch((err) => console.log(err));
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        setSaved(false);
        console.log(res);
    };

    const handleChangeStatus = () => {
        const res = axios
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
                        alert(res.data.msg);
                        // window.location.reload();
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        setIsLost(false);
        console.log(res);
    };

    const handleRevertStatus = () => {
        const res = axios
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
                        alert(res.data.msg);
                        // window.location.reload();
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        setIsLost(true);
        console.log(res);
    };

    const handleGoBack = () => {
        history.push("/listings");
    };

    return (
        <div className="PostInfoPage">
            <div className="post_info">
                <Post
                    key={item._id}
                    type={item.type}
                    img={item.img}
                    date={item.date}
                    time={item.time}
                    location={item.location}
                    description={item.description}
                    likes={item.likes}
                    link={item.link}
                />
            </div>
            <button className={PostInfoPageCSS.btn_post} onClick={handleDelete}>
                Delete Post
            </button>
            <button
                className={PostInfoPageCSS.btn_post}
                onClick={handleUpdatePost}
            >
                Update Post
            </button>
            {isOwner ? (
                !saved ? (
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
                )
            ) : (
                <span></span>
            )}
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
            <button className={PostInfoPageCSS.btn_post} onClick={handleGoBack}>
                Go back
            </button>
        </div>
    );
};

export default PostInfoPage;
