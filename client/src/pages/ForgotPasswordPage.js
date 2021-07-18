import { MetaTags } from "react-meta-tags";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ForgotPasswordPageCSS from "../styles/ForgotPasswordPage.module.css";

const isEmail = (email) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const initialState = {
    email: "",
    err: "",
    success: "",
};

function ForgotPasswordPage() {
    const [data, setData] = useState(initialState);

    const { email, err, success } = data;
    const history = useHistory();

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value, err: "", success: "" });
        console.log(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isEmail(email)) {
            return setData({ ...data, err: "Invalid emails.", success: "" });
        }
        console.log(err);

        try {
            const res = await axios.post("https://lost-it.herokuapp.com/user/forgot", { email });

            setData({ ...data, err: "", success: res.data.msg });
            history.push("/emailhasbeensentforreset");
        } catch (err) {
            err.response.data.msg &&
                setData({ ...data, err: err.response.data.msg, success: "" });
        }
    };

    return (
        <div className={ForgotPasswordPageCSS.ForgotPasswordPage}>
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
            <div className={ForgotPasswordPageCSS.scroll}>
                <div className={ForgotPasswordPageCSS.email_reset_container}>
                    <h1 className={ForgotPasswordPageCSS.email_reset_heading}>
                        Email for resetting password
                    </h1>

                    <form
                        formAction="enter email for reset"
                        onSubmit={handleSubmit}
                    >
                        <label
                            className={ForgotPasswordPageCSS.email_label}
                            htmlFor="email"
                        >
                            Email:
                            <input
                                className={ForgotPasswordPageCSS.email_input}
                                onChange={handleChangeInput}
                                value={email}
                                name="email"
                                type="email"
                            />
                        </label>
                        <button
                            className={ForgotPasswordPageCSS.btn_reset_email}
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;
