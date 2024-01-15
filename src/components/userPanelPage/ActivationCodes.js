import React from "react";

function ActivationCodes() {
    function handleCloseButtonClick() {
        document.getElementsByClassName("activation-codes-container").item(0).style.display = "none";
    }

    return (
        <div className={"activation-codes-container"}>
            <p onClick={handleCloseButtonClick} id={"close-fp-button"}
               className={"close-fp-button"}>x</p>

        </div>
    )
}

export default ActivationCodes