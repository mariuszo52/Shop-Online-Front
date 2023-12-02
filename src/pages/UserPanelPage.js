import Menu from "../components/Menu";
import SocialMedia from "../components/SocialMedia";
import Footer from "../components/Footer";
import React from "react";
import MyAccount from "../components/UserPanelPage components/MyAccount";

function UserPanelPage() {

    return (
        <div className={"main-div"}>
            <Menu/>
            <div className={"account-panel-container"}>
                <div className={"account-menu"}>
                    <p className={"account-menu-el"}>MY ACCOUNT</p>
                    <p className={"account-menu-el"}>MY ORDERS</p>
                    <p className={"account-menu-el"}>WISHLIST</p>
                    <p className={"account-menu-el"}>MESSAGES</p>
                    <p className={"account-menu-el"}>LOGOUT</p>
                </div>
            <MyAccount />
            </div>
            <SocialMedia/>
            <Footer/>
        </div>
    )
}

export default UserPanelPage;