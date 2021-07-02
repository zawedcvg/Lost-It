import MetaTags from "react-meta-tags";
import ListingsPageCSS from "../styles/ListingsPage.module.css";
const ListingsPage = () => {
    const Items = [
        {
            key: 1,
            img: "https://source.unsplash.com/random/200x200",
            date: "20th August 2020",
            time: "20:00",
            location: "Near USC",
            description: "Something, something",
        },
    ];
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
                        <a href="#something">Lost</a>
                        <a href="#something">Found</a>
                        <a href="#something">Both</a>
                    </nav>
                </div>
                <div className={ListingsPageCSS.bottom_part}>
                    <div className={ListingsPageCSS.listings_body}>
                        <div className={ListingsPageCSS.post}>
                            <img
                                src="https://source.unsplash.com/random/200x200"
                                alt=""
                            />
                            <div className={ListingsPageCSS.post_content}>
                                <span>
                                    Found on: 20th August, 2021 <br />
                                </span>
                                <span>
                                    Approximate time: 20:00 <br />
                                </span>
                                <span>
                                    Location: Near USC <br />
                                </span>
                                <span>
                                    Description <br />
                                </span>
                            </div>
                        </div>
                        <div className={ListingsPageCSS.post}>
                            <img
                                src="https://source.unsplash.com/random/200x200"
                                alt=""
                            />
                            <div className={ListingsPageCSS.post_content}>
                                <span>
                                    Found on: 20th August, 2021 <br />
                                </span>
                                <span>
                                    Approximate time: 20:00 <br />
                                </span>
                                <span>
                                    Location: Near USC <br />
                                </span>
                                <span>
                                    Description <br />
                                </span>
                            </div>
                        </div>
                        <div className={ListingsPageCSS.post}>
                            <img
                                src="https://source.unsplash.com/random/200x200"
                                alt=""
                            />
                            <div className={ListingsPageCSS.post_content}>
                                <span>
                                    Found on: 20th August, 2021 <br />
                                </span>
                                <span>
                                    Approximate time: 20:00 <br />
                                </span>
                                <span>
                                    Location: Near USC <br />
                                </span>
                                <span>
                                    Description <br />
                                </span>
                            </div>
                        </div>
                        {Items.map((items) => (
                            <Posts
                                key={items.key}
                                img={items.img}
                                date={items.date}
                                time={items.time}
                                location={items.location}
                                description={items.description}
                            />
                        ))}
                    </div>
                    <form>
                        <button className={ListingsPageCSS.btn_listings}>
                            Make a report
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const Posts = ({ img, date, time, location, description }) => {
    return (
        <div className={ListingsPageCSS.post}>
            <img src={img} alt="" />
            <div className={ListingsPageCSS.post_content}>
                <span>
                    Found on: {date} <br />
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
