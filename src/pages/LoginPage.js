import Menu from "../components/Menu";
import fbIcon from "../images/social-media/facebook.png"
import earn from "../images/earnup.svg";
import community from "../images/community.svg"
import discount from "../images/discount.svg"
import Footer from "../components/Footer";
import SocialMedia from "../components/SocialMedia";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNotification} from "../context/NotificationContext";
import {GoogleLogin} from '@react-oauth/google';
import {LoginSocialFacebook} from 'reactjs-social-login';
import ForgetPasswordForm from "../components/ForgetPasswordForm";
import NewPassword from "../components/NewPassword";
import {useCart} from "../context/CartContext";
import {useTranslation} from "react-i18next";
import {useTranslate} from "../context/TranslateContext";

function LoginPage() {
    const navigate = useNavigate();
    let {setNotificationText, setNotificationVisible} = useNotification();
    const [emailLogin, setEmailLogin] = useState("")
    const [emailPass, setEmailPass] = useState("")
    const [facebookAppId, setFacebookAppId] = useState("")
    const {saveCartToDatabase} = useCart();
    const {t, i18n} = useTranslation()
    const {translate} = useTranslate();
    let loginCredentials = {
        "email": emailLogin,
        "password": emailPass
    }
    useEffect(() => {
        function fetchFacebookAppId() {
            axios.get(process.env.REACT_APP_SERVER_URL + "/login/facebook/app-id")
                .then(response => setFacebookAppId(response.data))
                .catch(reason => console.log(reason))
        }

        fetchFacebookAppId()
    }, []);

    const googleLoginSuccess = response => {
        sessionStorage.setItem("jwt", "GOOGLE " + response.credential)
        const authHeader = {
            headers: {
                'Authorization': `GOOGLE ${response.credential}`
            }
        }
        axios.get(process.env.REACT_APP_SERVER_URL + "/login/google", authHeader)
            .then(response => {
                console.log(response.data)
                if (response.tokenId !== null) {
                    saveCartToDatabase()
                    window.location.href = "/";
                }
            })
            .catch(err => {
                translate(err.response.data)
                    .then(translation => {
                        setNotificationText(translation)
                        setNotificationVisible(true)
                    })
                    .catch(translationErr => console.log(translationErr))
                console.log(err)
            })
    }

    const handleKeypress = event => {
        if (event.keyCode === 13) {
            document.getElementById("login-form").addEventListener("submit", event => {
                onLoginButtonClick(event);
            });
        }
    };


    function onLoginButtonClick(submit) {
        submit.preventDefault();
        axios.post(process.env.REACT_APP_SERVER_URL + "/login", loginCredentials)
            .then(response => {
                sessionStorage.setItem("jwt", "Bearer " + response?.data.accessToken)
                sessionStorage.setItem("refreshToken", "Bearer " + response?.data.refreshToken)
                setNotificationText(t("loginSuccess"))
                setNotificationVisible(true)
                saveCartToDatabase()
                window.location.href = "/";
            })
            .catch(err => {
                translate(err.response.data)
                    .then(translation => {
                        setNotificationText(translation)
                        setNotificationVisible(true)
                    })
                    .catch(translationErr => console.log(translationErr))
                console.log(err)
            })
    }


    const googleLoginFailure = () => {
        setNotificationText("Login failed.")
        setNotificationVisible(true)
    }


    function facebookLoginSuccess(response) {
        sessionStorage.setItem("jwt", "FB " + response.data.accessToken)
        const data = {
            "email": response.data.email,
            "firstName": response.data.first_name,
            "lastName": response.data.last_name,
            "userId": response.data.userID
        }
        const authHeader = {
            headers: {
                'Authorization': `FB ${response.data.accessToken}`,
            }
        }
        axios.post(process.env.REACT_APP_SERVER_URL + "/login/facebook", data, authHeader)
            .then(response => {
                if (response.data.accessToken !== null) {
                    saveCartToDatabase()
                    window.location.href = "/";
                    console.log(response.data)
                }
            }).catch(err => {
            translate(err.response.data)
                .then(translation => {
                    setNotificationText(translation)
                    setNotificationVisible(true)
                })
                .catch(translationErr => console.log(translationErr))
            console.log(err)
        })
    }

    function facebookLoginReject(response) {
        console.log(response)

    }

    function handleForgotPasswordButton() {
        let forgetPasswordForm = document.getElementById("fp-main-container");
        forgetPasswordForm.style.display = "flex";
    }

    const renderFacebookLogin = () => {
        if (facebookAppId) {
            return (
                <LoginSocialFacebook
                    className={'facebook-button'}
                    onResolve={facebookLoginSuccess}
                    onReject={facebookLoginReject}
                    appId={facebookAppId}
                    scope={'public_profile, email'}
                    isOnlyGetToken={false}
                    children={
                        <p className={'facebook-login-button'}>
                            <img className={'login-button-icon'} alt={'fb'} src={fbIcon}/>
                            FACEBOOK
                        </p>
                    }
                />
            );
        }
        return null;
    };
    return (
        <div className={"main-div"}>
            <Menu/>
            <ForgetPasswordForm/>
            <NewPassword/>
            <div className={"login-page-container"}>
                <div className={"login-form-container"}>
                    <h1 className={"login-header"}>{t("loginHeader")}</h1>
                    <p>{t("alreadyRegistered")}</p>
                    <form id={"login-form"} onKeyDown={event => handleKeypress(event)}
                          onSubmit={event => onLoginButtonClick(event)}
                          className={"login-form"}>
                        <div className={"login-inputs"}>
                            <div className={"login-input"}>
                                <label>{t("email")}*</label>
                                <input required={true} onChange={event => setEmailLogin(event.target.value)}
                                       type={"email"}
                                       name={"email"}/>
                                <span>{t("requiredField")}</span>
                            </div>
                            <div className={"login-input"}>
                                <label>{t("password")}*</label>
                                <input required={true} onChange={event => setEmailPass(event.target.value)}
                                       type={"password"} name={"password"}/>
                                <span>{t("requiredField")}</span>
                            </div>
                        </div>
                        <div className={"forgot-password-container"}>
                            <a onClick={handleForgotPasswordButton}>{t("forgotPass")}</a>
                            <button type={"submit"} className={"login-button"}>{t("login")}</button>
                        </div>
                    </form>
                    <hr/>
                    <h1 className={"login-header"}>{t("or")}</h1>
                    <div className={"oauth-login-container"}>
                        {renderFacebookLogin()}
                        <div className={"google-button"}>
                            <GoogleLogin
                                onSuccess={response => googleLoginSuccess(response)}
                                onError={() => googleLoginFailure()}
                                type={"standard"}
                                locale={i18n.language}
                                size={"small"}
                                width={"250"}
                                shape={"rectangular"}/>

                        </div>


                    </div>
                </div>
                <form className={"register-form-container"}>
                    <h1 className={"register-header"}>{t("register")}</h1>
                    <p className={"form-description-paragraph"}>{t("registerDescr")}</p>
                    <h2><img className={"register-icon"} alt={"earn"} src={earn}/>{t("earn")}
                    </h2>
                    <h2><img className={"register-icon"} alt={"discount"} src={discount}/>{t("discounts")}
                    </h2>
                    <h2><img className={"register-icon"} alt={"community"} src={community}/>{t("partCommunity")}
                    </h2>
                    <p onClick={() => navigate("/account/register")} className={"register-button"}>{t("register")}</p>
                </form>
            </div>
            <SocialMedia/>
            <Footer/>
        </div>
    )
}

export default LoginPage;