import React, { useState } from "react";
import axios from "axios";
import MetaTags from "react-meta-tags";
import { useParams, useHistory } from "react-router-dom";
import ResetPasswordPageCSS from "../styles/ResetPasswordPage.module.css";
import SuccessNotification from "../notifications/SuccessNotification";
import ErrorNotification from "../notifications/ErrorNotification";

const isSmall = (password) => {
    if (password.length < 6) return true;
    return false;
};

const isMatch = (password, confirmPassword) => {
    if (password === confirmPassword) return true;
    return false;
};

const initialState = {
    password: "",
    confirmPassword: "",
    err: "",
    success: "",
};

function ResetPasswordPage() {
    const [data, setData] = useState(initialState);
    const { id } = useParams();
    const history = useHistory();

    const { password, confirmPassword, err, success } = data;

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value, err: "", success: "" });
        console.log(data);
    };

    const handleSubmit = async () => {
        if (isSmall(password)) {
            return setData({...data, err: "Password must be at least 6 characters.", success: ''})
        }

        if (!isMatch(password, confirmPassword)) {
            return setData({...data, err: "Password did not match.", success: ''})
        }
        
        try {
            const res = await axios.post('/user/reset', {password : password}, {
                headers: {Authorization: id}
            })

            console.log(res);
            setData({...data, err: "", success: res.data.msg});
            history.push("/resetsuccessful");

        } catch (error) {
            error.response.data.msg && setData({...data, err: error.response.data.msg, success: ''})
        }
        
    }

    return (
        <div className={ResetPasswordPageCSS.ResetPasswordPage}>
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
            <div className={ResetPasswordPageCSS.scroll}>
                <div className={ResetPasswordPageCSS.reset_container}>
                    <h1 className={ResetPasswordPageCSS.reset_heading}>
                        Reset your password
                    </h1>
                    {
                        <div>
                        {err && <ErrorNotification msg={err} />}
                        {success && <SuccessNotification msg={success} />}
                        </div>
                    }
                    <form formAction="changepassword" onSubmit={handleSubmit}>
                        <label
                            className={ResetPasswordPageCSS.password_change}
                            htmlFor="password"
                        >
                            Password:
                            <input
                                className={ResetPasswordPageCSS.reset_input}
                                name="password"
                                onChange={handleChangeInput}
                                value={password}
                                id="password"
                                type="password"
                                required
                            />
                        </label>
                        <label
                            className={ResetPasswordPageCSS.password_change}
                            htmlFor="confirmPassword"
                        >
                            Re-enter password:
                            <input
                                className={ResetPasswordPageCSS.reset_input}
                                name="confirmPassword"
                                onChange={handleChangeInput}
                                value={confirmPassword}
                                id="confirmPassword"
                                type="password"
                                required
                            />
                        </label>
                        <button
                            className={ResetPasswordPageCSS.btn_reset_password}
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

export default ResetPasswordPage;
