import { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
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
        <div className={MyPostsCSS.myPostPage}>
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
            <div class="container">
                <h1 className={MyPostsCSS.heading}>My Posts</h1>
                <nav className={MyPostsCSS.navigation} role="navigation">
                    <ul>
                        <li>
                            <img
                                className={MyPostsCSS.img1}
                                src="https://image.flaticon.com/icons/png/512/78/78075.png"
                                alt="thing"
                            />
                            <ul class="dropdown">
                                <li>
                                    <Link to={`/listings`}>Listings</Link>{" "}
                                    <br />
                                </li>
                                <li>
                                    <Link to={`/userdashboard`}>Dashboard</Link>{" "}
                                    <br />
                                </li>
                                <li>
                                    <Link to={`/reportitem`}>
                                        Report An Item
                                    </Link>{" "}
                                </li>
                                <li>
                                    <Link to={`/savedposts`}>Saved Posts</Link>{" "}
                                </li>
                                <li>
                                    <Link to={`/myposts`}>My Posts</Link>{" "}
                                </li>
                                <li>
                                    <Link to={`/logout`}>Logout</Link>{" "}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <div className={MyPostsCSS.listings_body}>
                    {toBeDisplayed.length !== 0 ? (
                        toBeDisplayed.map((items) => (
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
                        ))
                    ) : (
                        <p className={MyPostsCSS.no_posts}>
                            There are no posts.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyPosts;
