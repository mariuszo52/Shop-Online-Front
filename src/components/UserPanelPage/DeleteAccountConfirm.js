import axios from "axios";
import {useNotification} from "../../context/NotificationContext";

function DeleteAccountConfirm(){
    const {setNotificationVisible, setNotificationText} = useNotification();
    function deleteAccount() {
        axios.delete("http://localhost:8080/user/sm")
            .then(response => {
                sessionStorage.removeItem("jwt")
                sessionStorage.removeItem("refreshToken")
                setNotificationText("Account deleted.")
                setNotificationVisible(true)
                window.location.href = "http://localhost:3000/account/login"

            })
            .catch(reason =>{
                setNotificationText(reason.response.data)
                setNotificationVisible(true)
                console.log(reason)
            })
    }


    function handleCloseButtonClick() {
        let forgetPasswordForm = document.getElementById("account-delete-confirm-container");
        forgetPasswordForm.style.display = "none";
    }

    return(
        <div id={"account-delete-confirm-container"} className={"fp-main-container"}>
            <p onClick={handleCloseButtonClick} className={"close-fp-button"}>x</p>
            <label>ARE YOU SURE?</label><br/>
            <button id={"delete-account-button"} className={"login-button"} onClick={deleteAccount}>DELETE</button>
        </div>
    )
}
export default DeleteAccountConfirm;