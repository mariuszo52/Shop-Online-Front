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
function LoginPage() {
    const navigate = useNavigate();
    let {setNotificationText, setNotificationVisible} = useNotification();
    const [emailLogin, setEmailLogin] = useState("")
    const [emailPass, setEmailPass] = useState("")
    const [facebookAppId, setFacebookAppId] = useState("")
    let loginCredentials = {
        "email": emailLogin,
        "password": emailPass
    }
    useEffect(() => {
        function fetchFacebookAppId() {
            axios.get("http://localhost:8080/login/facebook/app-id")
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
        axios.get("http://localhost:8080/login/google", authHeader)
            .then(response => console.log(response.data))
            .catch(err => console.log(err))
        if (response.tokenId !== null) {
            window.location.href = "http://localhost:3000";
        } else {
            setNotificationText("Server error during user login.")
            setNotificationVisible(true)

        }
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
        axios.post("http://localhost:8080/login", loginCredentials)
            .then(response => {
                sessionStorage.setItem("jwt", "Bearer " + response?.data.accessToken)
                localStorage.setItem("refreshToken", "Bearer " + response?.data.refreshToken)
                setNotificationText("Login success.")
                setNotificationVisible(true)
                window.location.href = "http://localhost:3000";
            })
            .catch(err => {
                setNotificationText(err.response.data)
                setNotificationVisible()
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
        axios.post("http://localhost:8080/login/facebook", data, authHeader)
            .then(response => console.log(response.data))
            .catch(err => console.log(err))
        if (response.data.accessToken !== null) {
            window.location.href = "http://localhost:3000";
        } else {
            setNotificationText("Server error during user login.")
            setNotificationVisible(true)

        }

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
                            <img className={'login-button-icon'} alt={'fb'} src={fbIcon} />
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
                    <h1 className={"login-header"}>LOGIN</h1>
                    <p>Already Registered? Please Login From Here.</p>
                    <form id={"login-form"} onKeyDown={event => handleKeypress(event)}
                        onSubmit={event => onLoginButtonClick(event)}
                        className={"login-form"}>
                        <div className={"login-inputs"}>
                            <div className={"login-input"}>
                                <label>EMAIL*</label>
                                <input required={true} onChange={event => setEmailLogin(event.target.value)}
                                       type={"email"}
                                       name={"email"}/>
                                <span>THIS IS A REQUIRED FIELD.</span>
                            </div>
                            <div className={"login-input"}>
                                <label>PASSWORD*</label>
                                <input required={true} onChange={event => setEmailPass(event.target.value)}
                                       type={"password"} name={"password"}/>
                                <span>THIS IS A REQUIRED FIELD.</span>
                            </div>
                        </div>
                        <div className={"forgot-password-container"}>
                            <a onClick={handleForgotPasswordButton}>FORGOT YOUR PASSWORD?</a>
                            <button type={"submit"} className={"login-button"}>LOGIN</button>
                        </div>
                    </form>
                    <hr/>
                    <h1 className={"login-header"}>OR</h1>
                    <div className={"oauth-login-container"}>
                        {renderFacebookLogin()}
                        <div className={"google-button"}>
                            <GoogleLogin
                                onSuccess={response => googleLoginSuccess(response)}
                                onError={() => googleLoginFailure()}
                                type={"standard"}
                                locale={"EN"}
                                size={"small"}
                                width={"250"}
                                shape={"rectangular"}/>

                        </div>


                    </div>
                </div>
                <form className={"register-form-container"}>
                    <h1 className={"register-header"}>REGISTER</h1>
                    <p className={"form-description-paragraph"}>SIMPLY CLICK THE REGISTER BUTTON AND FILL OUT THE FORM
                        TO BECOME PART OF A HUGE ONLINE COMMUNITY.</p>
                    <h2><img className={"register-icon"} alt={"earn"} src={earn}/>EARN UP TO 30 BADGES
                    </h2>
                    <h2><img className={"register-icon"} alt={"discount"} src={discount}/>RECEIVE DISCOUNTS & BENEFITS
                    </h2>
                    <h2><img className={"register-icon"} alt={"community"} src={community}/>BE PART OF A COMMUNITY
                    </h2>
                    <p onClick={() => navigate("/account/register")} className={"register-button"}>REGISTER</p>
                </form>
            </div>
            <SocialMedia/>
            <Footer/>
        </div>
    )
}

export default LoginPage;