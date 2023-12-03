import {useEffect, useState} from "react";
import axios from "axios";
import {useNotification} from "../../context/NotificationContext";

function DeleteAccount(){
    const [password, setPassword] = useState("")
    const {setNotificationVisible, setNotificationText} = useNotification();
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
            <label>Delete account</label><br/>
            <label>Password</label>
            <input onChange={event => setPassword(event.target.value)}
                   required={true} className={"fp-input"} type={"password"}/><br/>
            <button id={"delete-account-button"} className={"login-button"} type={"submit"}>DELETE</button>
        </form>
    )
}
export default DeleteAccount;