import React from "react";

function MyAccount(){
    return(
        <>
        <div className={"account-menu"}>
            <p className={"account-menu-el"}>MY ACCOUNT</p>
            <p className={"account-menu-el"}>MY ORDERS</p>
            <p className={"account-menu-el"}>WISHLIST</p>
            <p className={"account-menu-el"}>MESSAGES</p>
            <p className={"account-menu-el"}>LOGOUT</p>
        </div>
    <div className={"menu-my-account"}>
        <h1>MY ACCOUNT</h1>
        <div className={"my-account-header"}>
            <h3>ACCOUNT INFORMATION</h3>
        </div>
        <div className={"account-information-div"}>
            <h4>ACCOUNT INFORMATION</h4>
            <p className={"account-info-paragraph"}>NAME LASTNAME</p>
            <p className={"account-info-paragraph"}>USER@EXAMPLE.COM</p>
            <p className={"account-info-button"}>EDIT INFORMATION</p>
            <p className={"account-info-button"}>CHANGE PASSWORD</p>
        </div>
        <div className={"my-account-header"}>
            <h3>ADDRESS BOOK</h3>
            <p className={"account-info-header-button"}>MANAGE ADDRESSES</p>
        </div>
        <div className={"account-information-div"}>
            <h4>DEFAULT SHIPPING ADDRESS</h4>
            <p className={"account-info-paragraph"}>NAME LASTNAME</p>
            <p className={"account-info-paragraph"}>RYNEK 1 NOWY SACZ</p>
            <p className={"account-info-paragraph"}>NOWY SACZ POLAND 33-300</p>
            <p className={"account-info-paragraph"}>POLAND</p>
            <p className={"account-info-paragraph"}>T: 123456789</p>
        </div>
        <p id={"delete-account-button"} className={"account-info-button"}>DELETE ACCOUNT</p>
    </div>
        </>
    )
}
export default MyAccount;