import Menu from "../components/Menu";
import SocialMedia from "../components/SocialMedia";
import Footer from "../components/Footer";
import React, {useEffect, useState} from "react";
import MyAccount from "../components/userPanelPage/MyAccount";
import MyOrders from "../components/userPanelPage/MyOrders";
import Wishlist from "../components/userPanelPage/Wishlist";
import {useTranslation} from "react-i18next";

function UserPanelPage() {
    const [activeMenuTab, setActiveMenuTab] = useState("my account")
    const {t} = useTranslation()
    function chooseActiveTab(event) {
        let tabName = event.target.id;
        window.location.href = "/account/user-panel?tab=" + tabName;
    }


    useEffect(() => {
        function checkActiveTab(){
            let queryString = window.location.search;
            let urlSearchParams = new URLSearchParams(queryString);
            let tab = urlSearchParams.get("tab");
            setActiveMenuTab(tab)
            let menuElements = document.getElementsByClassName("account-menu-el");
            for (let menuElement of menuElements) {
                menuElement.style.color = "white";
            }
            let selectedMenuElement = document.getElementById(tab);
            if(selectedMenuElement !== null)
            selectedMenuElement.style.color = "#0d7edc";

        }
        checkActiveTab()
    }, []);

    function onLogoutClick() {
        sessionStorage.removeItem("jwt")
        sessionStorage.removeItem("refreshToken")
        window.location.href = "/account/login"
    }

    return (
        <div className={"main-div"}>
            <Menu/>
            <div className={"account-panel-container"}>
                <div className={"account-menu"}>
                    <p id={"my-account"} onClick={event => chooseActiveTab(event)}
                       className={"account-menu-el"}>{t("myAccount")}</p>
                    <p id={"my-orders"} onClick={event => chooseActiveTab(event)}
                       className={"account-menu-el"}>{t("myOrders")}</p>
                    <p id={"wishlist"} onClick={event => chooseActiveTab(event)}
                       className={"account-menu-el"}>{t("wishlist")}</p>
                    <p id={"messages"} className={"account-menu-el"}>{t("messages")}</p>
                    <p className={"account-menu-el"} onClick={onLogoutClick}>{t("logout")}</p>
                </div>
                {activeMenuTab === "my-account" && (<MyAccount/>)}
                {activeMenuTab === "my-orders" && (<MyOrders/>)}
                {activeMenuTab === "wishlist" && (<Wishlist/>)}
            </div>
            <SocialMedia/>
            <Footer/>
        </div>
    )
}

export default UserPanelPage;