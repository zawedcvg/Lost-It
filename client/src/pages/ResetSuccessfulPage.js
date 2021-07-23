import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import ActivationSuccessfulPageCSS from "../styles/ActivationSuccessfulPage.module.css";

const ResetSuccessfulPage = () => {
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
                <title>Reset Successful</title>
            </MetaTags>

            <div className={ActivationSuccessfulPageCSS.no_scroll}>
                <div className={ActivationSuccessfulPageCSS.auth_success}>
                    <h1
                        className={
                            ActivationSuccessfulPageCSS.auth_success_text
                        }
                    >
                        Reset Successful
                    </h1>
                    <Link to="/login">Log In Here</Link>
                </div>
            </div>
        </div>
    );
};

export default ResetSuccessfulPage;
