import PostCSS from "../styles/Post.module.css";
import { Link } from "react-router-dom";

const Post = (props) => {
    return (
        <div className={PostCSS.post} type={props.type}>
            <img src={props.img} alt="" />
            <div className={PostCSS.post_content}>
                <span className={PostCSS.post_details}>
                    Name: {props.name} <br />
                </span>
                <span className={PostCSS.post_details}>
                    Approximate time: {props.time} <br />
                </span>
                <span className={PostCSS.post_details}>
                    Location: {props.location}
                    <br />
                </span>
                <span className={PostCSS.post_details}>
                    Description: {props.description} <br />
                </span>
                <span className={PostCSS.post_details}>
                    <Link to={`/post/${props.link}`}>More info</Link> <br />
                </span>
                <span className={PostCSS.post_details}>
                    Likes : {props.likes ? props.likes.length : 0}
                </span>
            </div>
        </div>
    );
};

export default Post;
