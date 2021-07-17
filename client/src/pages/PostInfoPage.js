import Post from "./Post";
import axios from "axios";
import {useState, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";

const PostInfoPage = () => {
    const [item, setItem] = useState({});
    const [isOwner, setIsOwner] = useState(false);
    const [isLost, setIsLost] = useState("");
    const [saved, setSaved] = useState("");
    const [liked, setLiked] = useState("");
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        axios.post("/user/refresh_token")
            .then(response => {
                axios.get(`/listings/post/${id}`, {
                    headers : {
                        Authorization : response.data.access_token
                    }
                })
                .then(res => {
                    console.log(res);
                    axios.get("/user/info", {
                        headers : {
                            Authorization : response.data.access_token
                        }
                    }).then(user => {
                        if (user.data.saved.includes(id.toString())) {
                            setSaved(true);
                            console.log("saved")
                        } else {
                            setSaved(false);
                        }
                        if (res.data.post.user === user.data._id) {
                            setIsOwner(true)
                        } else {
                            setIsOwner(false);
                        }
                        if (res.data.post.likes.includes(user.data._id)) {
                            setLiked(true);
                        } else {
                            setLiked(false);
                        }
                        setItem(res.data.post)
                        setIsLost(res.data.post.isLost);
                    }).catch(err => console.log(err))
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }, [])

    const handleDelete = () => {
        const res = axios.post("/user/refresh_token")
                            .then(response => {
                                axios.delete(`/listings/post/${id}`, {
                                    headers : {
                                        Authorization : response.data.access_token
                                    }
                                })
                                .then(res => {
                                    console.log(res);
                                })
                                .catch(err => console.log(err))
                            })
                            .catch(err => console.log(err));
        console.log(res);
        history.push("/listings")
    }

    const handleUpdatePost = () => {
        history.push(`/updatepost/${id}`);
    }

    const handleSave = () => {
        const res = axios.post("/user/refresh_token")
                        .then(response => {
                            axios.get("/user/info", {
                                headers : {
                                    Authorization : response.data.access_token
                                }
                            })
                            .then(r => {
                                axios.patch(`/listings/savepost/${id}`, {user : r.data._id}, {
                                    headers : {
                                        Authorization : response.data.access_token
                                    }
                                })
                                .then(res => {
                                    alert(res.data.msg);
                                    console.log(res);
                                })
                                .catch(err => console.log(err))
                            }).catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
        setSaved(true);
        console.log(res);
    }

    const handleUnsave = () => {
        const res = axios.post("/user/refresh_token")
                        .then(response => {
                            axios.get("/user/info", {
                                headers : {
                                    Authorization : response.data.access_token
                                }
                            })
                            .then(r => {
                                axios.patch(`/listings/unsavepost/${id}`, {user : r.data._id}, {
                                    headers : {
                                        Authorization : response.data.access_token
                                    }
                                })
                                .then(res => {
                                    alert(res.data.msg);
                                    console.log(res);
                                })
                                .catch(err => console.log(err))
                            }).catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
        setSaved(false);
        console.log(res);
    }

    const handleChangeStatus = () => {
        const res = axios.post("/user/refresh_token")
                        .then(response => {
                            axios.patch(`/listings/changestatus/${id}`, {post : id}, {
                                headers : {
                                    Authorization : response.data.access_token
                                }
                            }).then(res => {
                                alert(res.data.msg);
                                // window.location.reload();
                            }).catch(err => console.log(err))
                        }).catch(err => console.log(err))
        setIsLost(false);
        console.log(res);
    }

    const handleRevertStatus = () => {
        const res = axios.post("/user/refresh_token")
                        .then(response => {
                            axios.patch(`/listings/revertstatus/${id}`, {post : id}, {
                                headers : {
                                    Authorization : response.data.access_token
                                }
                            }).then(res => {
                                alert(res.data.msg);
                                // window.location.reload();
                            }).catch(err => console.log(err))
                        }).catch(err => console.log(err))
        setIsLost(true);
        console.log(res);
    }

    const handleGoBack = () => {
        history.push("/listings");
    }

    const handleLikePost = () => {
        const res = axios.post("/user/refresh_token")
                        .then(response => {
                            axios.get("/user/info", {
                                headers : {
                                    Authorization : response.data.access_token
                                }
                            })
                            .then(r => {
                                axios.patch(`/listings/post/${id}/like`, {}, {
                                    headers : {
                                        Authorization : response.data.access_token
                                    }
                                })
                                .then(res => {
                                    alert(res.data.msg);
                                    setLiked(true);
                                    console.log(res);
                                })
                                .catch(err => console.log(err))
                            }).catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
    }

    const handleUnlikePost = () => {
        const res = axios.post("/user/refresh_token")
                        .then(response => {
                            axios.get("/user/info", {
                                headers : {
                                    Authorization : response.data.access_token
                                }
                            })
                            .then(r => {
                                axios.patch(`/listings/post/${id}/unlike`, {}, {
                                    headers : {
                                        Authorization : response.data.access_token
                                    }
                                })
                                .then(res => {
                                    alert(res.data.msg);
                                    setLiked(false);
                                })
                                .catch(err => console.log(err))
                            }).catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
        
        console.log(res);
    }

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
            />
            </div>
            <button onClick={handleDelete}>
                Delete Post
            </button>
            <button onClick={handleUpdatePost}>
                Update Post
            </button>
            {
                isOwner 
                ?   !saved
                    ? <button onClick={handleSave}>
                        Save Post
                        </button>
                    : <button onClick={handleUnsave}>
                        Unsave Post
                        </button>
                : <span></span>
            } 
            {
                isOwner 
                ?   isLost
                    ? <button onClick={handleChangeStatus}>
                        Change status (to recovered)
                        </button> 
                    : <button onClick={handleRevertStatus}>
                        Revert status (to lost)
                        </button> 
                : <span></span>
            }
            {
                liked
                ? <button onClick={handleUnlikePost}>
                    Unlike Post
                    </button>
                : <button onClick={handleLikePost}>
                    Like Post
                    </button>
            }   
            <button onClick={handleGoBack}>
                Go back
            </button>
        </div>
    )
}

export default PostInfoPage;