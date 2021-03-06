import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import MetaTags from "react-meta-tags";
import ActivationSuccessfulPageCSS from "../styles/ActivationSuccessfulPage.module.css";
import SuccessNotification from "../notifications/SuccessNotification";
import ErrorNotification from "../notifications/ErrorNotification";

const ActivationSuccessfulPage = () => {
    const { activation_token } = useParams();
    const [err, setErr] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (activation_token) {
            const activationEmail = async () => {
                try {
                    const res = await axios.post("/user/activation", {
                        activation_token,
                    });
                    setSuccess(res.data.msg);
                } catch (err) {
                    err.response.data.msg && setErr(err.response.data.msg);
                }
            };
            activationEmail();
        }
    }, [activation_token]);

    return (
        <div className={ActivationSuccessfulPageCSS.ActivationSuccessfulPage}>
            <MetaTags>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, 
                    initial-scale = 1.0"
                />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <title>Document</title>
            </MetaTags>

            <div className={ActivationSuccessfulPageCSS.no_scroll}>
                <div className={ActivationSuccessfulPageCSS.auth_success}>
                    {
                        <div>
                            {err && <ErrorNotification msg={err} />}
                            {success && <SuccessNotification msg={success} />}
                        </div>
                    }
                    <h1
                        className={
                            ActivationSuccessfulPageCSS.auth_success_text
                        }
                    >
                        Activation Successful
                    </h1>
                    <Link to="/login">Log In Here</Link>
                </div>
            </div>
        </div>
    );
};

export default ActivationSuccessfulPage;
