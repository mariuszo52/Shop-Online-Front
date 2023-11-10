import Menu from "../components/Menu";
import googleIcon from "../images/social-media/google.png"
import fbIcon from "../images/social-media/facebook.png"
import earn from "../images/earnup.svg";
import community from "../images/community.svg"
import discount from "../images/discount.svg"
import Footer from "../components/Footer";
import SocialMedia from "../components/SocialMedia";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {useNotification} from "../context/NotificationContext";

function LoginPage() {
    const navigate = useNavigate();
    let {setNotificationText, setNotificationVisible} = useNotification();
    const [usernameLogin, setUsernameLogin] = useState("")
    const [emailPass, setEmailPass] = useState("")
    let loginCredentials = {
        "username": usernameLogin,
        "password": emailPass
    }

    function onLoginButtonClick() {
        axios.post("http://localhost:8080/login", loginCredentials)
            .then(response => {
                sessionStorage.setItem("jwt", "Bearer " + response.data)
                navigate("/")
            } )
            .catch(err => {
                setNotificationText(err.response.data)
                setNotificationVisible()
                console.log(err)
            })
    }

    return (
        <div className={"main-div"}>
            <Menu />
            <div className={"login-page-container"}>
                <div className={"login-form-container"}>
                    <h1 className={"login-header"}>LOGIN</h1>
                    <p>Already Registered? Please Login From Here.</p>
                    <form className={"login-form"}>
                        <div className={"login-input"}>
                        <label>USERNAME*</label>
                        <input onChange={event => setUsernameLogin(event.target.value)} type={"text"} name={"username"}/>
                            <span>THIS IS A REQUIRED FIELD.</span>
                        </div>
                        <div className={"login-input"}>
                            <label>PASSWORD*</label>
                            <input onChange={event =>  setEmailPass(event.target.value)} type={"text"} name={"password"}/>
                            <span>THIS IS A REQUIRED FIELD.</span>
                        </div>
                    </form>
                    <div className={"forgot-password-container"}>
                    <a href={"#"}>FORGOT YOUR PASSWORD?</a>
                        <p onClick={onLoginButtonClick} className={"login-button"}>LOGIN</p>
                    </div>
                    <hr/><h1 className={"login-header"}>OR</h1>
                    <div className={"oauth-login-container"}>
                        <p className={"facebook-button"}>
                            <img className={"login-button-icon"} alt={"fb"} src={fbIcon}/>FACEBOOK</p>
                        <p className={"google-button"}>
                            <img className={"login-button-icon"} alt={"google"} src={googleIcon}/> GOOGLE</p>
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