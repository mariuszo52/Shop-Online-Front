import {useNotification} from "../../context/NotificationContext";
import axios from "axios";


function EditPanel({url, userId, name}){
    const {setNotificationVisible, setNotificationText} = useNotification();

    function handleCloseButtonClick() {
        let editPanelForm = document.getElementById("edit-field-container");
        editPanelForm.style.display = "none";
    }
    function onSubmit(event){
        event.preventDefault()
        axios.put(url, {userId: userId})
            .then(response => console.log(response.data))
            .catch(reason => console.log(reason))

    }
    const handleEnterDown = event =>  {
        if(event.keyCode === 13){
            onSubmit(event)
        }
    }


    return(
        <form onSubmit={event => onSubmit(event)}
              onKeyDown={event => handleEnterDown(event)} id={"edit-field-container"}
              className={"fp-main-container"}>
            <p onClick={handleCloseButtonClick} className={"close-fp-button"}>x</p>
            <label>EDIT {name?.toUpperCase()}</label><br/>
            <label>NEW VALUE</label>
            <input type={"text"}/>
            <button type={"submit"} className={"login-button"} >SUBMIT</button>
        </form>
    )
}
export default EditPanel