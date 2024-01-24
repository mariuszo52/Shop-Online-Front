import {useEffect, useState} from "react";
import axios from "axios";
import {useNotification} from "../context/NotificationContext";

function NewPassword(){
    const [token, setToken] = useState(null)
    const [newPassword, setNewPassword] = useState("")
    const {setNotificationVisible, setNotificationText} = useNotification();
    const {t} = useTranslate()

    useEffect(() => {
        let urlSearchParams = new URLSearchParams(window.location.search);
        let token = urlSearchParams.get("token");
        setToken(token)
        if(token !== null){
            let passwordResetContainer = document.getElementById("password-reset-container");
            passwordResetContainer.style.display = "flex"
        }
    }, []);

    function handleCloseButtonClick() {
        let forgetPasswordForm = document.getElementById("password-reset-container");
        forgetPasswordForm.style.display = "none";
    }
    function changePassword(event) {
        event.preventDefault()
        const data = {
            "token": token,
            "newPassword": newPassword
        }
        if (token !== null) {
            axios.post("http://localhost:8080/login/reset-password", data)
                .then(response => {
                    handleCloseButtonClick()
                })
                .catch(reason => {
                    setNotificationText(reason.response.data)
                    setNotificationVisible(true)
                    console.log(reason)
                })
        }
    }
    const handleEnterDown = event =>  {
        if(event.keyCode === 13){
           changePassword(event)
        }
    }

    return(
        <form onSubmit={event => changePassword(event)}
            onKeyDown={event => handleEnterDown(event)} id={"password-reset-container"}
              className={"fp-main-container"}>
            <p onClick={handleCloseButtonClick} className={"close-fp-button"}>x</p>
            <label>{t("enterNewPass")}</label><br/>
            <input onChange={event => setNewPassword(event.target.value)}
                   required={true} className={"fp-input"} type={"password"}/><br/>
            <button className={"login-button"} type={"submit"}>{t("changePass")}</button>
        </form>
    )
}
export default NewPassword;