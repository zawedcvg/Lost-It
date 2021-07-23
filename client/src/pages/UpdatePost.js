import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ReportItemCSS from "../styles/ReportItemPage.module.css";
import SuccessNotification from "../notifications/SuccessNotification";
import ErrorNotification from "../notifications/ErrorNotification";

const initialState = {
    name: "",
    date: "",
    location: "",
    description: "",
    err: "",
    success: "",
};

const UpdatePost = () => {
    const history = useHistory();
    const [post, setPost] = useState({});
    const [edited, setEdited] = useState(initialState);
    const { id } = useParams();
    const [message, setMessage] = useState("");

    const { name, date, location, description, err, success } = edited;

    useEffect(() => {
        axios
            .post("/user/refresh_token")
            .then((res) => {
                axios
                    .get(`/listings/post/${id}`, {
                        headers: {
                            Authorization: res.data.access_token,
                        },
                    })
                    .then((r) => {
                        setPost(r.data.post);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }, []);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setEdited({ ...edited, [name]: value, err: "", success: "" });
    };

    const handleUpdate = () => {
        axios
            .post("/user/refresh_token")
            .then((res) => {
                axios
                    .patch(
                        `/listings/post/${id}`,
                        { ...edited },
                        {
                            headers: {
                                Authorization: res.data.access_token,
                            },
                        }
                    )
                    .then((r) => {
                        setMessage(r.data.msg);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));

        setEdited({ ...edited, err: "", success: "Updated Post!" });
        history.push("/listings");
    };

    return (
        <div>
            <h1>Update Post</h1>
            {
                <div>
                    {err && <ErrorNotification msg={err} />}
                    {success && <SuccessNotification msg={message} />}
                </div>
            }
            <label
                className={ReportItemCSS.reportitem_label}
                htmlFor="location"
            >
                Name that you can give the item :
                <input
                    className={`${ReportItemCSS.location} ${ReportItemCSS.reportitem_input}`}
                    name="name"
                    type="text"
                    value={name}
                    placeholder={post.name}
                    onChange={handleChangeInput}
                    required
                />
            </label>
            <label
                className={ReportItemCSS.reportitem_label}
                htmlFor="location"
            >
                Approximate Location <br />
                of the Item :
                <input
                    className={`${ReportItemCSS.location} ${ReportItemCSS.reportitem_input}`}
                    name="location"
                    type="text"
                    value={location}
                    placeholder={post.location}
                    onChange={handleChangeInput}
                    required
                />
            </label>
            <label
                className={ReportItemCSS.reportitem_label}
                htmlFor="description"
            >
                Description of the object :
                <textarea
                    id="description"
                    className={ReportItemCSS.reportitem_textarea}
                    name="description"
                    onChange={handleChangeInput}
                    placeholder={post.description}
                    type="text"
                    required
                    value={description}
                ></textarea>
            </label>
            <label className={ReportItemCSS.reportitem_label} htmlFor="date">
                Date of Happening :
                <input
                    type="date"
                    className={`${ReportItemCSS.date_found} ${ReportItemCSS.small} ${ReportItemCSS.reportitem_input}`}
                    name="date"
                    value={date}
                    placeholder={post.date}
                    required
                    onChange={handleChangeInput}
                />
            </label>
            <button
                className={ReportItemCSS.btn}
                type="submit"
                onClick={handleUpdate}
            >
                Submit
            </button>
            <span>or</span>
            <button
                onClick={(e) => history.push("/listings")}
                className={`${ReportItemCSS.btn} ${ReportItemCSS.right}`}
            >
                Go to listings
            </button>
        </div>
    );
};

export default UpdatePost;
