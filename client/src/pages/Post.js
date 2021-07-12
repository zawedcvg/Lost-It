import PostCSS from "../styles/Post.module.css";

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
            </div>
        </div>
    );
};


export default Post;