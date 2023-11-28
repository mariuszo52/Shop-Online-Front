import Menu from "../components/Menu";
import SocialMedia from "../components/SocialMedia";
import Footer from "../components/Footer";
import React from "react";
import MyAccount from "../components/MyAccount";

function UserPanelPage() {
    return (
        <div className={"main-div"}>
            <Menu/>
            <div className={"account-panel-container"}>
            <MyAccount />
            </div>
            <SocialMedia/>
            <Footer/>
        </div>
    )
}

export default UserPanelPage;