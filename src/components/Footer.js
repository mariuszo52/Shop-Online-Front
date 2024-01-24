import React from "react";
import {useTranslation} from "react-i18next";
function Footer(){
    const {t} = useTranslation()
    return(
<footer className={"footer"}>
    <p>{t("copyright")}</p>
</footer>
    )}
export default Footer;