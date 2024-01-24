import React from "react";

function ActivationCodes({codesList}) {
    const {t} = useTranslation()
    function handleCloseButtonClick() {
        document.getElementsByClassName("activation-codes-container").item(0).style.display = "none";
    }

    return (
        <div className={"activation-codes-container"}>
            <p onClick={handleCloseButtonClick} id={"close-fp-button"}
               className={"close-fp-button"}>x</p>
            <h1>{t("gameCodes")}:</h1>
           <ul className={"codes-list"}>
               {codesList?.map((code, index) => (
                   <li key={index} className={"codes-list-element"}>{code}</li>
               ))}
            </ul>
            <button className={"activate-code-button"}>{t("howActivate")}</button>

        </div>
    )
}

export default ActivationCodes