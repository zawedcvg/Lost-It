import Post from "./Post";
import axios from "axios";
import {useState, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";

const PostInfoPage = () => {
    const [item, setItem] = useState({});
    const [saved, setSaved] = useState(false);
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
                        }
                    }).catch(err => console.log(err))
                    setItem(res.data.post)
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
                                axios.patch(`/listings/savepost/${r.data._id}`, {"user" : r.data._id}, {
                                    headers : {
                                        Authorization : response.data.access_token
                                    }
                                })
                                .then(res => {
                                    alert(res.data.msg);
                                    setSaved(true);
                                    console.log(res);
                                })
                                .catch(err => console.log(err))
                            }).catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
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
                                axios.patch(`/listings/unsavepost/${r.data._id}`, {"user" : r.data._id}, {
                                    headers : {
                                        Authorization : response.data.access_token
                                    }
                                })
                                .then(res => {
                                    alert(res.data.msg);
                                    setSaved(false);
                                    console.log(res);
                                })
                                .catch(err => console.log(err))
                            }).catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
        console.log(res);
    }
    
    // const handleUnsave = () => {
    //     const res = axios.post("/user/refresh_token")
    //                         .then(response => {
    //                             axios.patch(`/listings/unsavepost/${id}`, {
    //                                 headers : {
    //                                     Authorization : response.data.access_token
    //                                 }
    //                             })
    //                             .then(res => {
    //                                 alert(res.data.msg);
    //                                 console.log(res);
    //                             })
    //                             .catch(err => console.log(err))
    //                         })
    //                         .catch(err => console.log(err));
    //     console.log(res);
    // }

    const handleGoBack = () => {
        history.push("/listings");
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
            />
            </div>
            <button onClick={handleDelete}>
                Delete Post
            </button>
            <button onClick={handleUpdatePost}>
                Update Post
            </button>
            {
                !saved
                ? <button onClick={handleSave}>
                    Save Post
                    </button>
                : <button onClick={handleUnsave}>
                    Unsave Post
                    </button>
            }            
            <button onClick={handleGoBack}>
                Go back
            </button>
        </div>
    )
}

export default PostInfoPage;