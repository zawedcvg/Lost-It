import axios from "axios";
import React from "react";
import MetaTags from "react-meta-tags";
import { useHistory } from "react-router-dom";
import ListingsPageCSS from "../styles/ListingsPage.module.css";
// import Post from "./Post";

const ListingsPage = () => {

    let listings;
    const obtainListings = async e => {
        try {
            const res = await axios.post("/user/refresh_token");
            listings = await axios.get("/listings/posts", {
                headers : {
                    Authorization : res.data.access_token,
                }
            });
            console.log(listings)
        } catch (err) {
            console.log(err);
        }
    }

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

    
    // const [requiredItems, setRequiredItems] = React.useState(Items);
    const history = useHistory();

    // function clickedEvent(e) {
    //     console.log(e.target);
    //     var searchParams = e.target.innerHTML;
    //     switch (searchParams) {
    //         case "Found":
    //             setRequiredItems(
    //                 Items.filter((items) => items.type === "found")
    //             );
    //             break;
    //         case "Lost":
    //             setRequiredItems(
    //                 Items.filter((items) => items.type === "lost")
    //             );
    //             break;
    //         case "Both":
    //             setRequiredItems(Items);
    //             break;
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
                            onClick={obtainListings}
                        >
                            Lost
                        </button>
                        <button
                            onClick={obtainListings}
                            className={ListingsPageCSS.options_button}
                        >
                            Found
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
                        {/* {requiredItems.map((items) => (
                            <Post
                                key={items.key}
                                type={items.type}
                                img={items.img}
                                date={items.date}
                                time={items.time}
                                location={items.location}
                                description={items.description}
                            />
                        ))} */}
                    </div>
                    <form>
                        <button onClick={e => history.push("/reportitem")} className={ListingsPageCSS.btn_listings}>
                            Make a report
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

// const Post = ({ img, type, date, time, location, description }) => {
//     var type_text;
//     if (type.toLowerCase() === "lost") {
//         type_text = "Lost On";
//     } else {
//         type_text = "Found On";
//     }
//     return (
//         <div className={ListingsPageCSS.post} type={type}>
//             <img src={img} alt="" />
//             <div className={ListingsPageCSS.post_content}>
//                 <span>
//                     {type_text}: {date} <br />
//                 </span>
//                 <span>
//                     Approximate time: {time} <br />
//                 </span>
//                 <span>
//                     Location: {location}
//                     <br />
//                 </span>
//                 <span>
//                     Description: {description} <br />
//                 </span>
//             </div>
//         </div>
//     );
// };

export default ListingsPage;
