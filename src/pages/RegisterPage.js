import Menu from "../components/Menu";
import React, {useEffect, useState} from "react";
import SocialMedia from "../components/SocialMedia";
import Footer from "../components/Footer";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useNotification} from "../context/NotificationContext";
import {useTranslation} from "react-i18next";

function RegisterPage() {
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [confirmEmail, setConfirmEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [username, setUsername] = useState("")
    const navigate = useNavigate();
    let {setNotificationText, setNotificationVisible} = useNotification();
    const {t} = useTranslation()
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
            document.getElementById("register-form")
                .addEventListener("submit", event =>  registerUser(event))
        }
    };

    function handleSuggestStrongPassButton() {
        axios.get("http://localhost:8080/register/suggest-pass")
            .then(response => {
                let passwordInput = document.getElementById("password-input");
                let confirmPasswordInput = document.getElementById("confirm-password-input");
                passwordInput.value = response.data;
                confirmPasswordInput.value = response.data;
                setPassword(response.data);
                setConfirmPassword(response.data);
                passwordInput.type = "text";
                confirmPasswordInput.type = "text";
            })
            .catch(err => console.log(err))
    }

    function registerUser(event) {
        event.preventDefault()
        axios.post("http://localhost:8080/register", userRegister)
            .then(() => {
                setNotificationText(t("confirmEmail")+ userRegister.email)
                setNotificationVisible()
                navigate("/account/login")
            })
            .catch(err => {
                setNotificationText(err.response.data)
                setNotificationVisible()
                console.log(err)
            })
    }

    return (
        <div id={"register-container"} className={"main-div"}>
            <Menu/>
            <h1 className={"register-page-h1"}>{t("newAccount")}</h1><br/>
            <div className={"register-personal-info"}>
                <h1 className={"login-header"}>{t("personalInfo")}</h1>
                <div className={"personal-info-inputs"}>
                    <div className={"login-input"}>
                        <label>{t("firstName")}*</label>
                        <input
                            onChange={event => setName(event.target.value)}
                            required={true}
                            type={"text"}
                            name={"name"}/>
                        <span>{t("requiredField")}</span>
                    </div>
                    <div className={"login-input"}>
                        <label>{t("lastName")}*</label>
                        <input
                            onChange={event => setLastName(event.target.value)}
                            required={true}
                            type={"text"}
                            name={"lastName"}/>
                        <span>{t("requiredField")}</span>
                    </div>
                </div>
            </div>
            <form
                id={"register-form"}
                onSubmit={event => registerUser(event)}
                onKeyDown={event => handleKeypress(event)}
                className={"register-sign-in-info"}>
                <div>
                    <h1 className={"login-header"}>{t("signInInfo")}</h1>
                    <div className={"personal-info-inputs"}>
                        <div className={"login-input"}>
                            <label>{t("username")}*</label>
                            <input
                                onChange={event => setUsername(event.target.value)}
                                required={true}
                                type={"text"}
                                name={"username"}/>
                            <span>{t("requiredField")}</span>
                        </div>
                        <div className={"login-input"}>
                            <label>EMAIL*</label>
                            <input
                                onChange={event => setEmail(event.target.value)}
                                required={true}
                                type={"email"}
                                name={"email"}/>
                            <span>{t("requiredField")}</span>
                        </div>
                        <div className={"login-input"}>
                            <label>{t("confirm")} EMAIL*</label>
                            <input
                                onChange={event => setConfirmEmail(event.target.value)}
                                required={true}
                                type={"email"}
                                name={"confirmEmail"}/>
                            <span>{t("requiredField")}</span>
                        </div>
                    </div>
                    <div className={"personal-info-inputs"}>
                        <div className={"login-input"}>
                            <label>{t("password")}*</label>
                            <input
                                id={"password-input"}
                                onChange={event => setPassword(event.target.value)}
                                required={true}
                                type={"password"}
                                name={"password"}/>
                            <span>{t("requiredField")}</span>
                        </div>
                        <div className={"login-input"}>
                            <label>{t("confirm")} {t("password")}*</label>
                            <input
                                id={"confirm-password-input"}
                                onChange={event => setConfirmPassword(event.target.value)}
                                required={true}
                                type={"password"}
                                name={"confirmPassword"}/>
                            <span>{t("requiredField")}</span>
                        </div>
                    </div>
                    <div className={"password-generate-container"}>
                        <p onClick={handleSuggestStrongPassButton} className={"password-generate-button"}>{t("strongPass")}</p>
                        <span>{t("passRestrictions")}</span>
                    </div>
                </div>
                <div className={"submit-register-container"}>
                    <p onClick={() => navigate("/account/login")} className={"back-to-login-button"}>{t("back")}</p>
                    <button className={"register-form-button"}>{t("createAccount")}</button>
                </div>
            </form>
            <SocialMedia/>
            <Footer/>
        </div>

    )
}

export default RegisterPage;