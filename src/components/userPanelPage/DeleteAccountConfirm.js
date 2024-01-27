import axios from "axios";
import {useNotification} from "../../context/NotificationContext";
import {useTranslation} from "react-i18next";
import {useTranslate} from "../../context/TranslateContext";

function DeleteAccountConfirm(){
    const {setNotificationVisible, setNotificationText} = useNotification();
    const {t} = useTranslation()
    const {translate} = useTranslate()
    function deleteAccount() {
        axios.delete("http://localhost:8080/user/sm")
            .then(response => {
                sessionStorage.removeItem("jwt")
                sessionStorage.removeItem("refreshToken")
                setNotificationText(t("accountDeleted"))
                setNotificationVisible(true)
                window.location.href = "/account/login"

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


    function handleCloseButtonClick() {
        let forgetPasswordForm = document.getElementById("account-delete-confirm-container");
        forgetPasswordForm.style.display = "none";
    }

    return(
        <div id={"account-delete-confirm-container"} className={"fp-main-container"}>
            <p onClick={handleCloseButtonClick} className={"close-fp-button"}>x</p>
            <label>{t("sure")}</label><br/>
            <button id={"delete-account-button"} className={"login-button"} onClick={deleteAccount}>{t("delete")}</button>
        </div>
    )
}
export default DeleteAccountConfirm;