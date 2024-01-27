import {useEffect, useState} from "react";
import axios from "axios";
import {useNotification} from "../../context/NotificationContext";
import {useTranslation} from "react-i18next";
import {useTranslate} from "../../context/TranslateContext";


function ChangePassword(){
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const {setNotificationVisible, setNotificationText} = useNotification();
    const {t} = useTranslation()
    const {translate} = useTranslate()

    function changePassword(event) {
        event.preventDefault()
        const data = {
            "oldPassword": oldPassword,
            "newPassword": newPassword,
            "confirmNewPassword": confirmNewPassword
        }
            axios.patch("http://localhost:8080/user/password", data)
                .then(response => {
                    setNotificationText(t("passwordHasChanged"))
                    setNotificationVisible(true)
                    handleCloseButtonClick()
                })
                .catch(err => {
                    translate(err.response.data)
                        .then(translation => {
                            setNotificationText(translation)
                            setNotificationVisible(true)
                        })
                        .catch(translationErr => console.log(translationErr))
                    console.log(err)
        })}
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
            <label>{t("changePassword")}</label><br/>
            <label>{t("oldPass")}</label>
            <input onChange={event => setOldPassword(event.target.value)}
                   required={true} className={"fp-input"} type={"password"}/><br/>
            <label>{t("newPass")}</label>
            <input onChange={event => setNewPassword(event.target.value)}
                   required={true} className={"fp-input"} type={"password"}/><br/>
            <label>{t("confirmNewPass")}</label>
            <input onChange={event => setConfirmNewPassword(event.target.value)}
                   required={true} className={"fp-input"} type={"password"}/><br/>
            <button type={"submit"} className={"login-button"} >CHANGE PASSWORD</button>
        </form>
    )
}
export default ChangePassword;