import { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";

const MyPosts = () => {

    const [toBeDisplayed, setToBeDisplayed] = useState([]);

    useEffect(() => {
        axios.post("https://lost-it.herokuapp.com/user/refresh_token")
            .then(response => {
                axios.get("https://lost-it.herokuapp.com/user/info", {
                    headers : {
                        Authorization : response.data.access_token
                    }
                }).then(res => {
                    axios.get(`https://lost-it.herokuapp.com/listings/user_posts/${res.data._id}`, {
                        headers : {
                            Authorization : response.data.access_token
                        }
                    }).then(r => {
                        setToBeDisplayed(r.data.posts)
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))
    })

    return (
        <div>
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
                        likes={items.likes}
                    />
                ))
            }
        </div>
    )
}

export default MyPosts;