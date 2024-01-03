import {useState} from "react";
import {useCookies} from "react-cookie";

function CookiesPolicyBar() {
    const [cookies, setCookie, removeCookie] = useCookies(["cookiesAccept"]);
    const [isBarHidden, setIsBarHidden] = useState(cookies.cookiesAccept)

    function handleAllowButtonClick() {
        setIsBarHidden(true)
        setCookie("cookiesAccept", true, {
            maxAge: 3600 * 24 * 14
        })
    }

        function handlePrivacyPolicyClick() {
            window.location.href = "/privacy-policy"
        }

        function handleTermsClick() {
            window.location.href = "/terms-and-conditions"
        }

        return (
            !isBarHidden && (
                <div id={"cookies-bar"} className={"cookies-bar"}>
                    <p className={"cookies-bar-text"}>
                        By continuing to use this site you automatically accept our
                        <span onClick={handlePrivacyPolicyClick}> privacy policy</span> and
                        <span onClick={handleTermsClick}> terms and conditions</span>.
                    </p>
                    <p onClick={handleAllowButtonClick} className={"cookies-accept-button"}>
                        ALLOW COOKIES
                    </p>
                </div>
            )
        );

}
    export default CookiesPolicyBar;