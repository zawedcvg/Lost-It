import { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";

const SavedPosts = () => {

    const [toBeDisplayed, setToBeDisplayed] = useState([]);

    useEffect(() => {
        axios.post("/user/refresh_token")
            .then(response => {
                axios.get("/listings/savedposts", {
                    headers : {
                        Authorization : response.data.access_token
                    }
                }).then(r => {
                    setToBeDisplayed(r.data.savedPosts)
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))
    }, []);

    return (
        <div>
            <h1>Saved</h1>
            {
                toBeDisplayed.map((items) => (
                    <Post
                        key={items._id}
                        type={items.type}
                        img={items.img}
                        date={items.date}
                        time={items.time}
                        location={items.location}
                        description={items.description}
                        link={items._id}
                    />
                ))
            }
        </div>
    )
}
export default SavedPosts;