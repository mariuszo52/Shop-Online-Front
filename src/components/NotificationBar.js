import {useNotification} from "../context/NotificationContext";

function NotificationBar(){
    const {isNotificationVisible, setIsNotificationVisible, notificationText} = useNotification();

    return(
        isNotificationVisible &&(
            <div className={"notification-bar"}>
                <p onClick={()=> setIsNotificationVisible(false)} id={"notification-close-button"}>x</p>
                <p>{notificationText}</p>
            </div>

        ))

}
export default NotificationBar;
