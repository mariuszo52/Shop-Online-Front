import {useEffect, useState} from "react";
import axios from "axios";
import {useNotification} from "../../context/NotificationContext";

function ChangePassword(){
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const {setNotificationVisible, setNotificationText} = useNotification();
    function changePassword(event) {
        event.preventDefault()
        const data = {
            "oldPassword": oldPassword,
            "newPassword": newPassword,
            "confirmNewPassword": confirmNewPassword
        }
            axios.patch("http://localhost:8080/user/password", data)
                .then(response => {
                    setNotificationText("Password has changed.")
                    setNotificationVisible(true)
                    handleCloseButtonClick()
                })
                .catch(reason =>{
                    setNotificationText(reason.response.data)
                    setNotificationVisible(true)
                    console.log(reason)
                })
        }
    const handleEnterDown = event =>  {
        if(event.keyCode === 13){
           changePassword(event)
        }
    }


function handleCloseButtonClick() {
    let forgetPasswordForm = document.getElementById("password-change-container");
    forgetPasswordForm.style.display = "none";
}

return(
        <form onSubmit={event => changePassword(event)}
            onKeyDown={event => handleEnterDown(event)} id={"password-change-container"}
              className={"fp-main-container"}>
            <p onClick={handleCloseButtonClick} className={"close-fp-button"}>x</p>
            <label>Change password</label><br/>
            <label>Old password</label>
            <input onChange={event => setOldPassword(event.target.value)}
                   required={true} className={"fp-input"} type={"password"}/><br/>
            <label>New password</label>
            <input onChange={event => setNewPassword(event.target.value)}
                   required={true} className={"fp-input"} type={"password"}/><br/>
            <label>Confirm new password</label>
            <input onChange={event => setConfirmNewPassword(event.target.value)}
                   required={true} className={"fp-input"} type={"password"}/><br/>
            <button type={"submit"} className={"login-button"} >CHANGE PASSWORD</button>
        </form>
    )
}
export default ChangePassword;