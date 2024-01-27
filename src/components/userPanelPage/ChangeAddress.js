import {useEffect, useState} from "react";
import axios from "axios";
import {useNotification} from "../../context/NotificationContext";
import {useTranslation} from "react-i18next";
import {useTranslate} from "../../context/TranslateContext";

function ChangeAddress(){
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const {setNotificationVisible, setNotificationText} = useNotification();
    const {t} = useTranslation()
    const {translate} = useTranslate()
    function changeAddress(event) {
        event.preventDefault()
        const data = {
            "address": address,
            "city": city,
            "country": country,
            "postalCode": postalCode,
            "phoneNumber": phoneNumber
        }
            axios.patch("http://localhost:8080/shipping-address/edit", data)
                .then(response => {
                    setNotificationText(t("addressChanged"))
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
           changeAddress(event)
        }
    }


function handleCloseButtonClick() {
    let forgetPasswordForm = document.getElementById("address-change-container");
    forgetPasswordForm.style.display = "none";
}

return(
        <form onSubmit={event => changeAddress(event)}
            onKeyDown={event => handleEnterDown(event)} id={"address-change-container"}
              className={"fp-main-container"}>
            <p onClick={handleCloseButtonClick} className={"close-fp-button"}>x</p>
            <label>{t("changeAddressLabel")}</label><br/>
            <label>{t("address")}</label>
            <input onChange={event => setAddress(event.target.value)}
                   required={true} className={"fp-input"} minLength={2} type={"text"}/><br/>
            <label>{t("city")}</label>
            <input onChange={event => setCity(event.target.value)}
                   required={true} className={"fp-input"} minLength={2} type={"text"}/><br/>
            <label>{t("country")}</label>
            <input onChange={event => setCountry(event.target.value)}
                   required={true} className={"fp-input"} minLength={2}  type={"text"}/><br/>
            <label>{t("postalCode")}</label>
            <input onChange={event => setPostalCode(event.target.value)}
                   required={true} className={"fp-input"} minLength={5} maxLength={5}  type={"text"}/><br/>
            <label>{t("phoneNumber")}</label>
            <input onChange={event => setPhoneNumber(event.target.value)}
                   minLength={9} maxLength={9}  required={true} className={"fp-input"} type={"text"}/><br/>
            <button className={"login-button"} type={"submit"}>{t("edit")}</button>
        </form>
    )
}
export default ChangeAddress;