import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import MetaTags from "react-meta-tags";
import EditUserDetailsPageCSS from "../styles/EditUserDetailsPage.module.css";

function EditUserDetailsPage() {
    const { id } = useParams();
    const history = useHistory();
    const [user, setUser] = useState([]);

    const [err, setErr] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleUpdate = async () => {
        try {
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg);
        }
    };

    return (
        <div className={EditUserDetailsPageCSS.EditUserDetailsPage}>
            <MetaTags>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, 
                    initial-scale = 1.0"
                />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <title>Edit User-Details</title>
            </MetaTags>
            <div className={EditUserDetailsPageCSS.scroll}>
                <div className={EditUserDetailsPageCSS.container}>
                    <h1 className={EditUserDetailsPageCSS.edit_details}>
                        Edit user details
                    </h1>
                    <form>
                        <label
                            className={EditUserDetailsPageCSS.label_edit_user}
                            for="name"
                        >
                            Name :
                            <input
                                className={
                                    EditUserDetailsPageCSS.input_user_details
                                }
                                type="text"
                            />
                        </label>
                        <label
                            className={EditUserDetailsPageCSS.label_edit_user}
                            for="teleId"
                        >
                            Telegram Id :
                            <input
                                className={
                                    EditUserDetailsPageCSS.input_user_details
                                }
                                type="text"
                            />
                        </label>
                        <label
                            className={EditUserDetailsPageCSS.label_edit_user}
                            for="email"
                        >
                            Email Address :
                            <input
                                className={
                                    EditUserDetailsPageCSS.input_user_details
                                }
                                type="email"
                            />
                        </label>
                    </form>
                    <button
                        onClick={handleUpdate}
                        className={EditUserDetailsPageCSS.btn_edit_user}
                    >
                        Apply Changes
                    </button>
                    <button
                        onClick={(e) => history.push("/userdashboard")}
                        className={EditUserDetailsPageCSS.btn_edit_user}
                    >
                        Discard Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditUserDetailsPage;
