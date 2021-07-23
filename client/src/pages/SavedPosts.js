import { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import axios from "axios";
import Post from "./Post";
import SavedPostsCSS from "../styles/SavedPosts.module.css";

const SavedPosts = () => {
    const [toBeDisplayed, setToBeDisplayed] = useState([]);

    useEffect(() => {
        axios
            .post("/user/refresh_token")
            .then((response) => {
                axios
                    .get("/listings/savedposts", {
                        headers: {
                            Authorization: response.data.access_token,
                        },
                    })
                    .then((r) => {
                        setToBeDisplayed(r.data.savedPosts);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className={SavedPostsCSS.savedPostsPage}>
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
            <div className={SavedPostsCSS.container}>
                <nav className={SavedPostsCSS.navigation} role="navigation">
                    <ul>
                        <li>
                            <img
                                className={SavedPostsCSS.img1}
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
                                    <Link to={`/myposts`}>My Posts</Link> <br />
                                </li>
                                <li>
                                    <Link to={`/savedposts`}>Saved Posts</Link>{" "}
                                    <br />
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <h1 className={SavedPostsCSS.heading}>Saved</h1>
                <div className={SavedPostsCSS.listings_body}>
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
        </div>
    );
};
export default SavedPosts;
