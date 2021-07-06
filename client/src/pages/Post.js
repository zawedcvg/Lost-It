import PostCSS from "../styles/Post.module.css";

const Post = ({ img, type, date, time, location, description }) => {
    var type_text;
    if (type.toLowerCase() === "lost") {
        type_text = "Lost On";
    } else {
        type_text = "Found On";
    }
    return (
        <div className={PostCSS.post} type={type}>
            <img src={img} alt="" />
            <div className={PostCSS.post_content}>
                <span>
                    {type_text}: {date} <br />
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


export default Post;