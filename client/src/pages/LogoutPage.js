import LogoutPageCSS from "../styles/LogoutPage.module.css";
import MetaTags from "react-meta-tags";

const LogoutPage = () => {
    return (
        <div className="LogoutPage">
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
            <div className={LogoutPageCSS.scroll}>
                <div className={LogoutPageCSS.thank_you}>
                    <h1>Thank you for using our service!</h1> <br />
                    <span className={LogoutPageCSS.seeusoon}>
                        See you soon.
                    </span>
                    <span className={LogoutPageCSS.login}>
                        Click here to <a href="login.html">Log Back In</a>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LogoutPage;
