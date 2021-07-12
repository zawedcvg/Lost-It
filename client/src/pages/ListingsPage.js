import axios from "axios";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import MetaTags from "react-meta-tags";
import ListingsPageCSS from "../styles/ListingsPage.module.css";
import { listsToObj } from "prelude-ls";

const ListingsPage = () => {
    // const Items = [
    //     {
    //         key: 1,
    //         type: "found",
    //         img: "https://source.unsplash.com/random/200x200",
    //         date: "20th August 2020",
    //         time: "20:00",
    //         location: "Near USC",
    //         description: "Something, something",
    //     },
    //     {
    //         key: 2,
    //         type: "lost",
    //         img: "https://source.unsplash.com/random/200x200",
    //         date: "21th August 2021",
    //         time: "21:00",
    //         location: "Near USCA",
    //         description: "Something, something",
    //     },
    // ];

    // const token = useSelector((state) => {
    //     console.log(state);
    //     return state.token});

    const [requiredItems, setRequiredItems] = useState([]);

    let listings;
    const obtainListings = async e => {
        try {
            const res = await axios.post("/user/refresh_token");
            console.log(res);
            listings = await axios.get("/listings/posts", {
                headers: {
                    Authorization: res.data.access_token
                },
            });
            console.log(listings.data.posts);
            setRequiredItems(listings.data.posts)
        } catch (err) {
            console.log(err);
        }
    };
    const history = useHistory();

    const handleLost = e => {
        setRequiredItems(requiredItems.filter(item => item.isLost));
        console.log(requiredItems);
    }

    const handleRecovered = e => {
        setRequiredItems(requiredItems.filter(item => !item.isLost));
        console.log(requiredItems)
    }

    // function clickedEvent(e) {
    //     console.log(e.target);
    //     var searchParams = e.target.innerHTML;
    //     switch (searchParams) {
    //         case "Found":
    //             setRequiredItems(
    //                 listings.filter((items) => items.type === "found")
    //             );
    //             break;
    //         case "Lost":
    //             setRequiredItems(
    //                 listings.filter((items) => items.type === "lost")
    //             );
    //             break;
    //         case "Both":
    //             setRequiredItems(listings);
    //             break;
    //         default:
    //             console.log("Invalid");
    //     }
    // }

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
                    <h1 className={ListingsPageCSS.listings_text}>Listings</h1>
                    <nav>
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
                </div>
                <div className={ListingsPageCSS.bottom_part}>
                    {/* <div className={ListingsPageCSS.listings_body}>
                        {requiredItems.map((items) => (
                            <Posts
                                key={items.key}
                                type={items.type}
                                img={items.img}
                                date={items.date}
                                time={items.time}
                                location={items.location}
                                description={items.description}
                            />
                        ))}
                    </div> */}
                    <form>
                        <button className={ListingsPageCSS.btn_listings} onClick={e => history.push("/reportitem")}>
                            Make a report
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const Posts = ({ img, type, date, time, location, description }) => {
    var type_text;
    if (type.toLowerCase() === "lost") {
        type_text = "Lost On";
    } else {
        type_text = "Found On";
    }
    return (
        <div className={ListingsPageCSS.post} type={type}>
            <img src={img} alt="" />
            <div className={ListingsPageCSS.post_content}>
                <span>
                    {type_text}: {date} <br />
                </span>
                <span>
                    Approximate time: {time} <br />
                </span>
                <span>
                    Location: {location}
                    <br />
                </span>
                <span>
                    Description: {description} <br />
                </span>
            </div>
        </div>
    );
};

export default ListingsPage;
