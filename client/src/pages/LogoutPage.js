import LogoutPageCSS from "../styles/LogoutPage.module.css";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";

const LogoutPage = () => {
    return (
        <div className={LogoutPageCSS.LogoutPage}>
            <MetaTags>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, 
                    initial-scale = 1.0"
                />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <title>Logout</title>
            </MetaTags>
            <div
                className={`${LogoutPageCSS.scroll} ${LogoutPageCSS.thank_you}`}
            >
                <div className={LogoutPageCSS.thank_text}>
                    <h1>
                        Thank you for using our service!
                        <br />
                        <span className={LogoutPageCSS.seeusoon}>
                            See you soon.
                        </span>
                    </h1>
                    <span className={LogoutPageCSS.login}>
                        Click here to <Link to="/login">Log Back In</Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LogoutPage;
