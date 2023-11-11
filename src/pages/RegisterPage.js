import Menu from "../components/Menu";
import React, {useState} from "react";
import SocialMedia from "../components/SocialMedia";
import Footer from "../components/Footer";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useNotification} from "../context/NotificationContext";

function RegisterPage(){
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [confirmEmail, setConfirmEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [username, setUsername] = useState("")
    const  navigate = useNavigate();
    let {setNotificationText, setNotificationVisible} = useNotification();
    const userRegister = {
        "name": name,
        "lastName": lastName,
        "username": username,
        "email": email,
        "confirmEmail": confirmEmail,
        "password": password,
        "confirmPassword": confirmPassword
    }
    const handleKeypress = event => {
        if (event.keyCode === 13) {
            registerUser()
        }
    };

    function registerUser() {
        console.log(userRegister)
        axios.post("http://localhost:8080/register", userRegister)
            .then(() =>{
                setNotificationText("Account has created.")
                setNotificationVisible()
                navigate("/account/login")
            })
            .catch(err => {
                setNotificationText(err.response.data)
                setNotificationVisible()
                console.log(err)
            })
    }

    return(
        <div onKeyDown={handleKeypress} id={"register-container"} className={"main-div"}>
            <Menu />
            <h1 className={"register-page-h1"}>CREATE NEW CUSTOMER ACCOUNT</h1><br/>
            <div className={"register-personal-info"}>
                <h1 className={"login-header"}>PERSONAL INFORMATION</h1>
                <div className={"personal-info-inputs"}>
                    <div className={"login-input"}>
                        <label>NAME*</label>
                        <input
                            onChange={event => setName(event.target.value)}
                            required={true}
                            type={"text"}
                            name={"name"}/>
                        <span>THIS IS A REQUIRED FIELD.</span>
                    </div>
                    <div className={"login-input"}>
                        <label>LASTNAME*</label>
                        <input
                            onChange={event => setLastName(event.target.value)}
                            required={true}
                            type={"text"}
                            name={"lastName"}/>
                        <span>THIS IS A REQUIRED FIELD.</span>
                    </div>
                </div>
            </div>
            <div className={"register-sign-in-info"}>
                <h1 className={"login-header"}>SIGN-IN INFORMATION</h1>
                <div className={"personal-info-inputs"}>
                    <div className={"login-input"}>
                        <label>USERNAME*</label>
                        <input
                            onChange={event => setUsername(event.target.value)}
                            required={true}
                            type={"text"}
                            name={"username"}/>
                        <span>THIS IS A REQUIRED FIELD.</span>
                    </div>
                    <div className={"login-input"}>
                        <label>EMAIL*</label>
                        <input
                            onChange={event => setEmail(event.target.value)}
                            required={true}
                            type={"email"}
                            name={"email"}/>
                        <span>THIS IS A REQUIRED FIELD.</span>
                    </div>
                    <div className={"login-input"}>
                        <label>CONFIRM EMAIL*</label>
                        <input
                            onChange={event => setConfirmEmail(event.target.value)}
                            required={true}
                            type={"email"}
                            name={"confirmEmail"}/>
                        <span>THIS IS A REQUIRED FIELD.</span>
                    </div>
                </div>
                <div className={"personal-info-inputs"}>
                    <div className={"login-input"}>
                        <label>PASSWORD*</label>
                        <input
                            onChange={event => setPassword(event.target.value)}
                            required={true}
                            type={"password"}
                            name={"password"}/>
                        <span>THIS IS A REQUIRED FIELD.</span>
                    </div>
                    <div className={"login-input"}>
                        <label>CONFIRM PASSWORD*</label>
                        <input
                            onChange={event => setConfirmPassword(event.target.value)}
                            required={true}
                            type={"password"}
                            name={"confirmPassword"}/>
                        <span>THIS IS A REQUIRED FIELD.</span>
                    </div>
                </div>
                <div className={"password-generate-container"}>
                    <p className={"password-generate-button"}>SUGGEST STRONG PASSWORD</p>
                    <span>Your password needs to be at least 8 characters long and use 4 different types of character
                        (Lower Case, Upper Case, Digits, Special Characters).</span>
                </div>
            </div>
            <div className={"submit-register-container"}>
                <p onClick={() => navigate("/account/login")} className={"back-to-login-button"}>BACK</p>
                <p onClick={registerUser} className={"register-form-button"}>CREATE AN ACCOUNT</p>


            </div>
            <SocialMedia />
            <Footer />
        </div>

    )
}
export default RegisterPage;