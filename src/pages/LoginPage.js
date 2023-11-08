import Menu from "../components/Menu";
import googleIcon from "../images/social-media/google.png"
import fbIcon from "../images/social-media/facebook.png"
import earn from "../images/earnup.svg";
import community from "../images/community.svg"
import discount from "../images/discount.svg"
import Footer from "../components/Footer";
import SocialMedia from "../components/SocialMedia";
import {useNavigate} from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();
    return (
        <div className={"main-div"}>
            <Menu />
            <div className={"login-page-container"}>
                <div className={"login-form-container"}>
                    <h1 className={"login-header"}>LOGIN</h1>
                    <p>Already Registered? Please Login From Here.</p>
                    <form className={"login-form"}>
                        <div className={"login-input"}>
                        <label>EMAIL ADDRESS*</label>
                        <input type={"text"} name={"email"}/>
                            <span>THIS IS A REQUIRED FIELD.</span>
                        </div>
                        <div className={"login-input"}>
                            <label>PASSWORD*</label>
                            <input type={"text"} name={"email"}/>
                            <span>THIS IS A REQUIRED FIELD.</span>
                        </div>
                    </form>
                    <div className={"forgot-password-container"}>
                    <a href={"#"}>FORGOT YOUR PASSWORD?</a>
                        <p className={"login-button"}>LOGIN</p>
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