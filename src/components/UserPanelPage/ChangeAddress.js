import {useEffect, useState} from "react";
import axios from "axios";
import {useNotification} from "../../context/NotificationContext";

function ChangeAddress(){
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const {setNotificationVisible, setNotificationText} = useNotification();
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
                    setNotificationText("Shipping address has changed.")
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
            <label>Change shipping address</label><br/>
            <label>Address</label>
            <input onChange={event => setAddress(event.target.value)}
                   required={true} className={"fp-input"} minLength={2} type={"text"}/><br/>
            <label>City</label>
            <input onChange={event => setCity(event.target.value)}
                   required={true} className={"fp-input"} minLength={2} type={"text"}/><br/>
            <label>Country</label>
            <input onChange={event => setCountry(event.target.value)}
                   required={true} className={"fp-input"} minLength={2}  type={"text"}/><br/>
            <label>Postal code</label>
            <input onChange={event => setPostalCode(event.target.value)}
                   required={true} className={"fp-input"} minLength={5} maxLength={5}  type={"text"}/><br/>
            <label>Phone number</label>
            <input onChange={event => setPhoneNumber(event.target.value)}
                   minLength={9} maxLength={9}  required={true} className={"fp-input"} type={"text"}/><br/>
            <button className={"login-button"} type={"submit"}>EDIT</button>
        </form>
    )
}
export default ChangeAddress;