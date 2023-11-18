import Menu from "../components/Menu";
import googleIcon from "../images/social-media/google.png"
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
import {GoogleLogin} from "react-google-login"
import {LoginSocialFacebook} from 'reactjs-social-login';
import {gapi} from "gapi-script";

function LoginPage() {
    const navigate = useNavigate();
    let {setNotificationText, setNotificationVisible} = useNotification();
    const [emailLogin, setEmailLogin] = useState("")
    const [emailPass, setEmailPass] = useState("")
    let loginCredentials = {
        "email": emailLogin,
        "password": emailPass
    }
    useEffect(() => {
        function start(){
            gapi.client.init({
                clientId: "985874330130-mjutgkgsi961lgafhbkghnc4id8coa0r.apps.googleusercontent.com",
                scope: ""
            })
        }
        gapi.load("client:auth2", start)
    }, []);

    function googleLoginSuccess(response){
        sessionStorage.setItem("jwt", "Oauth " + response.tokenId)
        const authHeader = {
            headers: {
                'Authorization': `Oauth ${response.tokenId}`
            }
        }
        axios.post("http://localhost:8080/login/google", null, authHeader)
            .then(response => console.log(response.data))
            .catch(err => console.log(err))
        if(response.tokenId !== null) {
            setNotificationText("Login success")
            setNotificationVisible(true)
            navigate("/")
        }else {
            setNotificationText("Server error during user login.")
            setNotificationVisible(true)

        }
    }


    const handleKeypress = event => {
        if (event.keyCode === 13) {
            onLoginButtonClick()
        }
    };


    function onLoginButtonClick() {
        axios.post("http://localhost:8080/login", loginCredentials)
            .then(response => {
                sessionStorage.setItem("jwt", "Bearer " + response.data)
                setNotificationText("Login success.")
                setNotificationVisible(true)
                navigate("/")
            } )
            .catch(err => {
                setNotificationText(err.response.data)
                setNotificationVisible()
                console.log(err)
            })
    }


    function googleLoginFailure() {
        setNotificationText("Login failed.")
        setNotificationVisible(true)
    }

    function facebookLoginSuccess(response) {
        console.log(response)
        sessionStorage.setItem("jwt", "Oauth " + response.data.accessToken)
        const authHeader = {
            headers: {
                'Authorization': `Oauth ${response.data.accessToken}`,
                'Signed_request': response.data.signedRequest
            }
        }
        axios.post("http://localhost:8080/login/facebook", null, authHeader)
            .then(response => console.log(response.data))
            .catch(err => console.log(err))

    }

    function facebookLoginReject(response) {
        console.log("błąd")

    }

    return (
        <div className={"main-div"}>
            <Menu />
            <div className={"login-page-container"}>
                <div onKeyDown={handleKeypress} className={"login-form-container"}>
                    <h1 className={"login-header"}>LOGIN</h1>
                    <p>Already Registered? Please Login From Here.</p>
                    <form className={"login-form"}>
                        <div className={"login-input"}>
                        <label>EMAIL*</label>
                        <input required={true} onChange={event => setEmailLogin(event.target.value)} type={"email"} name={"email"}/>
                            <span>THIS IS A REQUIRED FIELD.</span>
                        </div>
                        <div className={"login-input"}>
                            <label>PASSWORD*</label>
                            <input required={true} onChange={event =>  setEmailPass(event.target.value)} type={"password"} name={"password"}/>
                            <span>THIS IS A REQUIRED FIELD.</span>
                        </div>
                    </form>
                    <div className={"forgot-password-container"}>
                    <a href={"#"}>FORGOT YOUR PASSWORD?</a>
                        <p onClick={onLoginButtonClick} className={"login-button"}>LOGIN</p>
                    </div>
                    <hr/><h1 className={"login-header"}>OR</h1>
                    <div className={"oauth-login-container"}>
                        <LoginSocialFacebook
                            className={"facebook-button"}
                            onResolve={facebookLoginSuccess}
                            onReject={facebookLoginReject}
                            appId={"1062927578170362"}
                            scope={"public_profile, email"}
                            isOnlyGetToken={true}
                            children={<p className={"facebook-login-button"}>
                                <img className={"login-button-icon"} alt={"fb"} src={fbIcon}/>FACEBOOK</p>}
                            />

                        <GoogleLogin
                            render={props => (
                                <p onClick={props.onClick} id={"google-login"} className={"google-button"}>
                                    <img className={"login-button-icon"} alt={"google"} src={googleIcon}/> GOOGLE</p>
                            )}
                            clientId={"985874330130-mjutgkgsi961lgafhbkghnc4id8coa0r.apps.googleusercontent.com"}
                            onSuccess={googleLoginSuccess}
                            onFailure={googleLoginFailure}
                            scope={""}
                            buttonText={null}
                            icon={false}
                        />
                    </div>
                </div>
                <div className={"register-form-container"}>
                    <h1 className={"register-header"}>REGISTER</h1>
                    <p className={"form-description-paragraph"}>SIMPLY CLICK THE REGISTER BUTTON AND FILL OUT THE FORM TO BECOME PART OF A HUGE ONLINE COMMUNITY.</p>
                    <h2><img className={"register-icon"} alt={"earn"} src={earn}/>EARN UP TO 30 BADGES
                    </h2>
                    <h2><img className={"register-icon"} alt={"discount"} src={discount}/>RECEIVE DISCOUNTS & BENEFITS
                    </h2>
                    <h2><img className={"register-icon"} alt={"community"} src={community}/>BE PART OF A COMMUNITY
                    </h2>
                    <p onClick={() => navigate("/account/register")} className={"register-button"}>REGISTER</p>
                </div>
            </div>
            <SocialMedia />
            <Footer />
        </div>
    )
}
export default LoginPage;