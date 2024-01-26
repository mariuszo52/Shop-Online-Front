import React from "react";
import Menu from "../components/Menu";
import {useTranslation} from "react-i18next";
import PrivacyPolicyEn from "../components/privacyPolicy/en/PrivacyPolicyEn";
import PrivacyPolicyPl from "../components/privacyPolicy/pl/PrivacyPolicyPl";
function PrivacyPolicyPage() {
    const {t, i18n} = useTranslation()
    return (
        <div className={"main-div"}>
            <h1 className={"checkout-h1"}>{t("privacyPolicyHeader")}</h1>
            {i18n.language === "en" && (<PrivacyPolicyEn/>)}
            {i18n.language === "pl" && (<PrivacyPolicyPl />)}
            <Menu/>
        </div>
)
}
export default PrivacyPolicyPage;