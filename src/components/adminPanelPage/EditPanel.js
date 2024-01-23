import axios from "axios";
import {useTranslation} from "react-i18next";


function EditPanel({url, userId, name}){
    const {t} = useTranslation()

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
            <label>{t("edit")} {name?.toUpperCase()}</label><br/>
            <label>{t("newValue")}</label>
            <input type={"text"}/>
            <button type={"submit"} className={"login-button"} >{t("submit")}</button>
        </form>
    )
}
export default EditPanel