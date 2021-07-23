import ErrorNotificationCSS from "../styles/ErrorNotification.module.css"

const ErrorNotification = props => {
    return (
        <div className={`${ErrorNotificationCSS.bar} ${ErrorNotificationCSS.error}`}>
            {props.msg}
        </div>
    )
}

export default ErrorNotification;