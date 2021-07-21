import PostCSS from "../styles/Post.module.css";
import { Link } from "react-router-dom";
import post from "../images/post.png"

const Post = (props) => {
    return (
        <div className={PostCSS.post} type={props.type}>
            <img src={post} alt="Listing" />
            <div className={PostCSS.post_content}>
                <span className={PostCSS.post_details}>
                    Name: {props.name} <br />
                </span>
                <span className={PostCSS.post_details}>
                    Location: {props.location}
                    <br />
                </span>
                <span className={PostCSS.post_details}>
                    Description: {props.description} <br />
                </span>
                <span className={PostCSS.post_details}>
                    Likes : {props.likes ? props.likes.length : 0}
                </span>
                <br />
                <br />
                <br />
                <span className={PostCSS.post_details}>
                    <Link to={`/post/${props.link}`}>More info</Link> <br />
                </span>
                
            </div>
        </div>
    );
};

export default Post;
