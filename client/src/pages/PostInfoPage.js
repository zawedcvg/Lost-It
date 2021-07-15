import Post from "./Post";
import axios from "axios";
import {useState, useEffect, useParams} from "react";
import {useHistory} from "react-router-dom";

const PostInfoPage = () => {
    const [item, setItem] = useState({});
    const id = useParams();
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
                    setItem(res.post)
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
                                axios.patch(`/listings/savepost/${id}`, {
                                    headers : {
                                        Authorization : response.data.access_token
                                    }
                                })
                                .then(res => {
                                    alert(res.data.msg);
                                    console.log(res);
                                })
                                .catch(err => console.log(err))
                            })
                            .catch(err => console.log(err));
        console.log(res);
    }
    
    const handleUnsave = () => {
        const res = axios.post("/user/refresh_token")
                            .then(response => {
                                axios.patch(`/listings/unsavepost/${id}`, {
                                    headers : {
                                        Authorization : response.data.access_token
                                    }
                                })
                                .then(res => {
                                    alert(res.data.msg);
                                    console.log(res);
                                })
                                .catch(err => console.log(err))
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
            />
            </div>
            <button onClick={handleDelete}>
                Delete Post
            </button>
            <button onClick={handleUpdatePost}>
                Update Post
            </button>
            <button onClick={handleSave}>
                Save Post
            </button>
            <button onClick={handleUnsave}>
                Unsave Post
            </button>
        </div>
    )
}

export default PostInfoPage;