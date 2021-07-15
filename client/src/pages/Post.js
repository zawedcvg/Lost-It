import PostCSS from "../styles/Post.module.css";
import {Link} from "react-router-dom";

const Post = (props) => {
    return (
        <div className={PostCSS.post} type={props.type}>
            <img src={props.img} alt="" />
            <div className={PostCSS.post_content}>
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
                    <Link to={`/post/${props.link}`}>More info</Link>
                </span>
            </div>
        </div>
    );
};


export default Post;