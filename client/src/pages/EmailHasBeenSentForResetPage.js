import MetaTags from "react-meta-tags";
import EmailHasBeenSentForResetPageCSS from "../styles/EmailHasBeenSentForResetPage.module.css";

const EmailHasBeenSentForResetPage = () => {
    return (
        <div
            className={
                EmailHasBeenSentForResetPageCSS.EmailHasBeenSentForResetPage
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

            <div className={EmailHasBeenSentForResetPageCSS.scroll_sent_auth}>
                <div
                    className={
                        EmailHasBeenSentForResetPageCSS.email_auth_container
                    }
                >
                    <h1
                        className={
                            EmailHasBeenSentForResetPageCSS.email_auth_text
                        }
                    >
                        Email has been sent <br />
                        to reset your password
                    </h1>
                    <span
                        className={EmailHasBeenSentForResetPageCSS.check_email}
                    >
                        Please check your email
                    </span>
                </div>
            </div>
        </div>
    );
};

export default EmailHasBeenSentForResetPage;
