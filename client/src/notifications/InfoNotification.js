import InfoNotificationCSS from "../styles/InfoNotification.module.css";

const InfoNotification = (props) => {
    return (
        <div
            className={`${InfoNotificationCSS.bar} ${InfoNotificationCSS.info}`}
        >
            {props.msg}
        </div>
    );
};

export default InfoNotification;
