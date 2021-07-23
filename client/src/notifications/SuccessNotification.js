import SuccessNotificationCSS from "../styles/SuccessNotification.module.css"

const SuccessNotification = props => {
    return (
        <div className={`${SuccessNotificationCSS.bar} ${SuccessNotificationCSS.success}`}>
            {props.msg}
        </div>
    )
}

export default SuccessNotification;