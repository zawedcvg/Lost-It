import { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import MyPostsCSS from "../styles/MyPosts.module.css";

const MyPosts = () => {
    const [toBeDisplayed, setToBeDisplayed] = useState([]);

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
                        axios
                            .get(`/listings/user_posts/${res.data._id}`, {
                                headers: {
                                    Authorization: response.data.access_token,
                                },
                            })
                            .then((r) => {
                                setToBeDisplayed(r.data.posts);
                            })
                            .catch((err) => console.log(err));
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    });

    return (
        <div>
            <h1 className={MyPostsCSS.heading}>My Posts</h1>
            <div className={MyPostsCSS.listings_body}>
                {toBeDisplayed.map((items) => (
                    <Post
                        key={items._id}
                        name={items.name}
                        type={items.type}
                        img={items.img}
                        date={items.date}
                        time={items.time}
                        location={items.location}
                        description={items.description}
                        link={items._id}
                        likes={items.likes}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyPosts;

