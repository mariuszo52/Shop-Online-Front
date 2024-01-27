import {useState} from "react";
import {useCookies} from "react-cookie";
import {useTranslation} from "react-i18next";

function CookiesPolicyBar() {
    const [cookies, setCookie, removeCookie] = useCookies(["cookiesAccept"]);
    const [isBarHidden, setIsBarHidden] = useState(cookies.cookiesAccept)
    const {t} = useTranslation()

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
                        {t("byContinuing")}
                        <span onClick={handlePrivacyPolicyClick}> {t("privacyPolicy")}</span>
                    </p>
                    <p onClick={handleAllowButtonClick} className={"cookies-accept-button"}>
                        {t("allowCookies")}
                    </p>
                </div>
            )
        );

}
    export default CookiesPolicyBar;