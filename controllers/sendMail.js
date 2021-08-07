const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS,
} = process.env;

const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    OAUTH_PLAYGROUND
);

const sendMail = (to, url, txt) => {
    oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
    });

    const accessToken = oauth2Client.getAccessToken();
    const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            accessToken,
        },
    });

    const mailOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: to,
        subject: txt,
        html: `
<div>
    <table
        style="
            border-collapse: collapse;
            padding: 0;
            width: 100%;
            background-color: #ffffff;
            font-family: 'Courier New', Courier, monospace;
            font-size: 40px;
        "
        dir="auto"
    >
        <p
            style="
                border: none;
                padding: 0;
                margin: 0;
                background-color: #ffffff;
                color: #000000;
                font-family: 'Courier New', Courier, monospace;
                font-size: 40px;
                font-weight: 400;
                line-height: 48px;
                text-align: center;
            "
        >
            <span style="border: none; padding: 0; margin: 0"
                ><strong style="border-bottom: 2px solid grey"
                    >Activation Link
                </strong>
                <br />
                <span style="font-size: 19px; font-style: italic"
                    >Begin your journey with lost-it</span
                >
            </span>
            <br />
            <span style="font-size: 20px; text-align: left">
                To activate your account please click the link below:
                <br />
                <a href=${url} style="text-decoration: none">Activate your account</a>
            </span>
        </p>
    </table>
</div>
        `,
    };

    smtpTransport.sendMail(mailOptions, (err, info) => {
        if (err) return err;
        return info;
    });
};

module.exports = sendMail;
