import {useEffect, useState} from "react";
import axios from "axios";
import {useNotification} from "../../context/NotificationContext";
import {useTranslation} from "react-i18next";
import {useTranslate} from "../../context/TranslateContext";

function ChangeUserInfo(){
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const {setNotificationVisible, setNotificationText} = useNotification();
    const {t} = useTranslation()
    const {translate} = useTranslate()
    function changeUserInfo(event) {
        event.preventDefault()
        const data = {
            "name": name,
            "lastName": lastName,
        }
            axios.patch("http://localhost:8080/user-info/edit", data)
                .then(response => {
                    setNotificationText(t("userInfoHasChanged"))
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
           changeUserInfo(event)
        }
    }


function handleCloseButtonClick() {
    let forgetPasswordForm = document.getElementById("user-info-change-container");
    forgetPasswordForm.style.display = "none";
}

return(
        <form onSubmit={event => changeUserInfo(event)} onKeyDown={event => handleEnterDown(event)}
              id={"user-info-change-container"}
              className={"fp-main-container"}>
            <p onClick={handleCloseButtonClick} className={"close-fp-button"}>x</p>
            <label>{t("changeUserInfo")}</label><br/>
            <label>{t("firstName")}</label>
            <input onChange={event => setName(event.target.value)}
                   required={true} className={"fp-input"} minLength={2} type={"text"}/><br/>
            <label>{t("lastName")}</label>
            <input onChange={event => setLastName(event.target.value)}
                   required={true} className={"fp-input"} minLength={2} type={"text"}/><br/>
            <button className={"login-button"} type={"submit"}>{t("edit")}</button>
        </form>
    )
}
export default ChangeUserInfo;