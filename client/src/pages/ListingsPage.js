import axios from "axios";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import ListingsPageCSS from "../styles/ListingsPage.module.css";
import Post from "./Post";

const ListingsPage = () => {
    const [requiredItems, setRequiredItems] = useState([]);
    const [toBeDisplayed, setToBeDisplayed] = useState([]);

    const getItemsData = async (token) => {
        try {
            const {data} = await axios.get("/listings/posts", {
                headers: {
                    Authorization: token
                }
            });
            return data;
        } catch (err) {
            console.log(err.message);
        }
    }

    const getPermissions = async () => {
        try {
            const {data} = await axios.post("/user/refresh_token");
            return data.access_token;    
        } catch (err) {
            console.log(err.message);
        }   
    }

    let componentMounted = true;

    useEffect(() => {
        const temp = async () => {
            const token = await getPermissions();
            const itemsData = await getItemsData(token);

            if (componentMounted) {
                setRequiredItems(itemsData.posts);
            }
            // console.log(itemsData)
            return () => {
                componentMounted = false;
            };
        }
        temp();
    }, [])

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

    const obtainListings = e => {
        const temp = []; 
        for (let i = 0; i < requiredItems.length; i++) {
            temp.push(requiredItems[i]);
        }
        setToBeDisplayed(temp);
    };

    const handleLost = e => {
        const temp = []; 
        for (let i = 0; i < requiredItems.length; i++) {
            if (requiredItems[i].isLost) {
                temp.push(requiredItems[i]);
            }
        }
        setToBeDisplayed(temp);
    }

    const handleRecovered = e => {
        const temp = []; 
        for (let i = 0; i < requiredItems.length; i++) {
            if (!requiredItems[i].isLost) {
                temp.push(requiredItems[i]);
            }
        }
        setToBeDisplayed(temp);
    }

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
                    <div className={ListingsPageCSS.listings_body}>
                        {
                            (toBeDisplayed || requiredItems).map((items) => (
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
                        }
                        
                    </div>
                    <form>
                        <button className={ListingsPageCSS.btn_listings} onClick={e => history.push("/reportitem")}>
                            Make a report
                        </button>
                        <button className={ListingsPageCSS.btn_listings} onClick={e => history.push("/userdashboard")}>
                            Go back
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ListingsPage;
