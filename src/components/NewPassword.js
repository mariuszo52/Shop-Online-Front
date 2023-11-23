import {useEffect, useState} from "react";
import axios from "axios";

function NewPassword(){
    const [token, setToken] = useState(null)
    const [newPassword, setNewPassword] = useState("")

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
                    //add notifications
                    console.log(response)
                    handleCloseButtonClick()
                })
                .catch(reason => console.log(reason))
        }
    }
    const handleEnterDown = event =>  {
        if(event.keyCode === 13){
           changePassword(event)
        }
    }

    return(
        <form onKeyDown={event => handleEnterDown(event)} id={"password-reset-container"} className={"fp-main-container"}>
            <p onClick={handleCloseButtonClick} className={"close-fp-button"}>x</p>
            <label>Enter new password</label><br/>
            <input onChange={event => setNewPassword(event.target.value)}
                   required={true} className={"fp-input"} type={"password"}/><br/>
            <button onClick={event => changePassword(event)}
                    className={"login-button"} type={"submit"}>CHANGE PASSWORD</button>
        </form>
    )
}
export default NewPassword;