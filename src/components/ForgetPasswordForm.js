import {useState} from "react";
import axios from "axios";
import {useNotification} from "../context/NotificationContext";
import {useTranslation} from "react-i18next";
import {useTranslate} from "../context/TranslateContext";

function ForgetPasswordForm(){
    const [email, setEmail] = useState("");
    const {t} = useTranslation()
    const {translate} = useTranslate()
    let {setNotificationVisible, setNotificationText} = useNotification();
    function handleCloseButtonClick() {
        let forgetPasswordForm = document.getElementById("fp-main-container");
        forgetPasswordForm.style.display = "none";
    }

    const handleSendButtonClick = event => {
        event.preventDefault();
        const params = {
            "email":email
        };
        axios.get("http://localhost:8080/login/forget-password", {params})
            .then(response => {
                handleCloseButtonClick()
                setNotificationText(response.data)
                setNotificationVisible()
            })
            .catch(reason =>{
                console.log(reason)
                setNotificationVisible();
                setNotificationText(translate(reason.response.data))

            } )
    }

    const handleEnterDown = event =>  {
        if(event.keyCode === 13){
            handleSendButtonClick(event)
        }
    }

    return(
        <form onSubmit={event => handleSendButtonClick(event)}
            onKeyDown={handleEnterDown} id={"fp-main-container"} className={"fp-main-container"}>
                <p onClick={handleCloseButtonClick} className={"close-fp-button"}>x</p>
            <p>{t("enterEmail")}</p><br/>
            <input className={"fp-input"}  required={true} type={"email"}
                   onChange={event => setEmail(event.target.value)}/><br/>
            <button type={"submit"} className={"login-button"}>{t("send")}</button>
        </form>
    )
}
export default ForgetPasswordForm;