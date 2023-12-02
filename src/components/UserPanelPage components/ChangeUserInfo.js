import {useEffect, useState} from "react";
import axios from "axios";
import {useNotification} from "../../context/NotificationContext";

function ChangeUserInfo(){
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const {setNotificationVisible, setNotificationText} = useNotification();
    function changeUserInfo(event) {
        event.preventDefault()
        const data = {
            "name": name,
            "lastName": lastName,
        }
            axios.patch("http://localhost:8080/user-info/edit", data)
                .then(response => {
                    setNotificationText("User info has changed.")
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
            <label>Change user information</label><br/>
            <label>Name</label>
            <input onChange={event => setName(event.target.value)}
                   required={true} className={"fp-input"} minLength={2} type={"text"}/><br/>
            <label>Last name</label>
            <input onChange={event => setLastName(event.target.value)}
                   required={true} className={"fp-input"} minLength={2} type={"text"}/><br/>
            <button className={"login-button"} type={"submit"}>EDIT</button>
        </form>
    )
}
export default ChangeUserInfo;