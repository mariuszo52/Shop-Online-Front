import React from "react";
function footer(){
    const {t} = useTranslate()
    return(
<footer className={"footer"}>
    <p>{t("copyright")}</p>
</footer>
    )}
export default footer;