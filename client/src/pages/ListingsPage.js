import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import ListingsPageCSS from "../styles/ListingsPage.module.css";
import Post from "./Post";
import InfoNotification from "../notifications/InfoNotification";

const ListingsPage = () => {
    const [requiredItems, setRequiredItems] = useState([]);
    const [toBeDisplayed, setToBeDisplayed] = useState([]);
    const [message, setMessage] = useState("");
    const [caption, setCaption] = useState("");

    const getItemsData = async (token) => {
        try {
            const { data } = await axios.get("/listings/posts", {
                headers: {
                    Authorization: token,
                },
            });
            return data;
        } catch (err) {
            console.log(err.message);
        }
    };

    const getPermissions = async () => {
        try {
            const { data } = await axios.post("/user/refresh_token");
            return data.access_token;
        } catch (err) {
            console.log(err.message);
        }
    };

    let componentMounted = true;

    useEffect(() => {
        const temp = async () => {
            const token = await getPermissions();
            const itemsData = await getItemsData(token);

            if (componentMounted) {
                setRequiredItems(itemsData.posts);
                setMessage(
                    "<-   Please click on any of the buttons to the left"
                );
                setCaption("posts now.")
            }
            return () => {
                componentMounted = false;
            };
        };
        temp();
    }, []);

    // useEffect(() => {
    //     axios.post("/user/refresh_token")
    //         .then(res => {
    //             axios.get("/listings/posts", {
    //                 headers : {
    //                     Authorization : res.data.access_token
    //                 }
    //             }).then(response => {
    //                 setToBeDisplayed(response.data.posts);
    //                 setRequiredItems(response.data.posts);
    //             }).catch(err => {
    //                 console.log(err)
    //             })
    //         }).catch(err => console.log(err))
    // })

    const history = useHistory();

    const obtainListings = () => {
        setMessage("");
        const temp = [];
        for (let i = 0; i < requiredItems.length; i++) {
            temp.push(requiredItems[i]);
        }
        setToBeDisplayed(temp);
        setCaption("items in total.")
    };

    const handleLost = () => {
        setMessage("");
        const temp = [];
        for (let i = 0; i < requiredItems.length; i++) {
            if (requiredItems[i].isLost) {
                temp.push(requiredItems[i]);
            }
        }
        setToBeDisplayed(temp);
        setCaption("items which are lost.")
    };

    const handleRecovered = () => {
        setMessage("");
        const temp = [];
        for (let i = 0; i < requiredItems.length; i++) {
            if (!requiredItems[i].isLost) {
                temp.push(requiredItems[i]);
            }
        }
        setToBeDisplayed(temp);
        setCaption("items which have been successfully recovered by owners.")
    };

    return (
        <div className={ListingsPageCSS.scroll_listings}>
            <MetaTags>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, 
                    initial-scale = 1.0"
                />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <title>Document</title>
            </MetaTags>
            <div className={ListingsPageCSS.container}>
                <div
                    className={ListingsPageCSS.top}
                    id={ListingsPageCSS.something}
                >
                    <nav
                        className={ListingsPageCSS.outer_navigation}
                        role="navigation"
                    >
                        <ul>
                            <li>
                                <img
                                    className={ListingsPageCSS.img1}
                                    src="https://image.flaticon.com/icons/png/512/78/78075.png"
                                    alt="thing"
                                />
                                <ul class="dropdown">
                                    <li>
                                        <Link to={`/listings`}>Listings</Link>{" "}
                                        <br />
                                    </li>
                                    <li>
                                        <Link to={`/userdashboard`}>
                                            Dashboard
                                        </Link>{" "}
                                        <br />
                                    </li>
                                    <li>
                                        <Link to={`/reportitem`}>
                                            Report An Item
                                        </Link>{" "}
                                    </li>
                                    <li>
                                        <Link to={`/savedposts`}>
                                            Saved Posts
                                        </Link>{" "}
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
                    <h1 className={ListingsPageCSS.listings_text}>Listings</h1>
                    <nav className={ListingsPageCSS.navigation}>
                        <button
                            className={ListingsPageCSS.options_button}
                            onClick={handleLost}
                        >
                            Lost
                        </button>
                        <button
                            onClick={handleRecovered}
                            className={ListingsPageCSS.options_button}
                        >
                            Recovered
                        </button>
                        <button
                            onClick={obtainListings}
                            className={ListingsPageCSS.options_button}
                        >
                            Both
                        </button>
                    </nav>
                    {
                        <span>
                            {message && <InfoNotification msg={message} />}
                        </span>
                    }
                </div>
                <div className={ListingsPageCSS.bottom_part}>
                    <div className={ListingsPageCSS.listings_body}>
                        {(toBeDisplayed || requiredItems).map((items) => (
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
                    <form>
                        <button
                            className={ListingsPageCSS.btn_listings}
                            onClick={(e) => history.push("/reportitem")}
                        >
                            Make a report
                        </button>
                        <button
                            className={ListingsPageCSS.btn_listings}
                            onClick={(e) => history.push("/userdashboard")}
                        >
                            Go back
                        </button>
                    </form>
                    <div>
                        <p>There are </p>
                        <p>{toBeDisplayed.length}</p>
                        <p>{caption}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingsPage;
