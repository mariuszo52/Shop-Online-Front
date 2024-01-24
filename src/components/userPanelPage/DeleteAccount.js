import {useEffect, useState} from "react";
import axios from "axios";
import {useNotification} from "../../context/NotificationContext";

function DeleteAccount(){
    const [password, setPassword] = useState("")
    const {setNotificationVisible, setNotificationText} = useNotification();
    const {t} = useTranslate()
    function deleteAccount(event) {
        event.preventDefault()
        const config ={
            headers:{
                "password": password
            }
        }
            axios.delete("http://localhost:8080/user/standard", config)
                .then(response => {
                    sessionStorage.removeItem("jwt")
                    setNotificationText(t("accountDeleted"))
                    setNotificationVisible(true)
                    window.location.href = "/account/login"

                })
                .catch(reason =>{
                    setNotificationText(reason.response.data)
                    setNotificationVisible(true)
                    console.log(reason)
                })
        }
    const handleEnterDown = event =>  {
        if(event.keyCode === 13){
           deleteAccount(event)
        }
    }


function handleCloseButtonClick() {
    let forgetPasswordForm = document.getElementById("account-delete-container");
    forgetPasswordForm.style.display = "none";
}

return(
        <form onSubmit={event => deleteAccount(event)}
            onKeyDown={event => handleEnterDown(event)} id={"account-delete-container"}
              className={"fp-main-container"}>
            <p onClick={handleCloseButtonClick} className={"close-fp-button"}>x</p>
            <label>{t("deleteAccount")}</label><br/>
            <label></label>
            <input onChange={event => setPassword(event.target.value)}
                   required={true} className={"fp-input"} type={"password"}/><br/>
            <button id={"delete-account-button"} className={"login-button"} type={"submit"}>{t("delete")}</button>
        </form>
    )
}
export default DeleteAccount;