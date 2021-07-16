import PostCSS from "../styles/Post.module.css";
import {Link} from "react-router-dom";

const Post = (props) => {
    return (
        <div className={PostCSS.post} type={props.type}>
            <img src={props.img} alt="" />
            <div className={PostCSS.post_content}>
                <span>
                    Name: {props.name} <br />
                </span>
                <span>
                    Approximate time: {props.time} <br />
                </span>
                <span>
                    Location: {props.location}
                    <br />
                </span>
                <span>
                    Description: {props.description} <br />
                </span>
                <span>
                    <Link to={`/post/${props.link}`}>More info</Link> <br />
                </span>
                <span>
                    Likes : {props.likes ? props.likes.length : 0}
                </span>
            </div>
        </div>
    );
};


export default Post;