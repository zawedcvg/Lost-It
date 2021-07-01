// import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import MetaTags from "react-meta-tags";
// import { Link, useHistory } from "react-router-dom";
import EmailHasBeenSentForActivationPageCSS from "../styles/EmailHasBeenSentForActivationPage.module.css";

function EmailHasBeenSentForActivation() {
    // const history = useHistory();

    // const handleLoginClick = () => {
    //     history.push("/login");
    // };

    return (
        <div
            className={
                EmailHasBeenSentForActivationPageCSS.EmailHasBeenSentForActivationPage
            }
        >
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
            <div
                className={EmailHasBeenSentForActivationPageCSS.email_container}
            >
                <h1 className={EmailHasBeenSentForActivationPageCSS.email_sent}>
                    Email has been <br />
                    sent for activation
                </h1>
                <span
                    className={EmailHasBeenSentForActivationPageCSS.check_email}
                >
                    Please check your email
                </span>
            </div>
        </div>
    );
}

export default EmailHasBeenSentForActivation;
