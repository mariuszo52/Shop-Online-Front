import Menu from "../components/Menu";
import SocialMedia from "../components/SocialMedia";
import Footer from "../components/Footer";
import React, {useState} from "react";
import MyAccount from "../components/UserPanelPage/MyAccount";
import MyOrders from "../components/MyOrders";
import {useNavigate} from "react-router-dom";

function UserPanelPage() {
    const [activeMenuTab, setActiveMenuTab] = useState("MY ACCOUNT")
    let navigate = useNavigate();
    function chooseActiveTab(event){
        let menuElements = document.getElementsByClassName("account-menu-el");
        for (let menuElement of menuElements) {
            menuElement.style.color = "white";
        }
        let selectedMenuElement = document.getElementById(event.target.id);
        selectedMenuElement.style.color = "#0d7edc";
        setActiveMenuTab(event.target.innerText)
        }

    function onLogoutClick() {
        sessionStorage.removeItem("jwt")
        window.location.href = "http://localhost:3000/account/login"
    }

    return (
        <div className={"main-div"}>
            <Menu/>
            <div className={"account-panel-container"}>
                <div className={"account-menu"}>
                    <p id={"my-account"} onClick={event => chooseActiveTab(event)}
                       className={"account-menu-el"}>MY ACCOUNT</p>
                    <p id={"my-orders"} onClick={event => chooseActiveTab(event)}
                       className={"account-menu-el"}>MY ORDERS</p>
                    <p id={"wishlist"} className={"account-menu-el"}>WISHLIST</p>
                    <p id={"messages"} className={"account-menu-el"}>MESSAGES</p>
                    <p className={"account-menu-el"} onClick={onLogoutClick}>LOGOUT</p>
                </div>
                {activeMenuTab === "MY ACCOUNT" && (<MyAccount/>)}
                {activeMenuTab === "MY ORDERS" && (<MyOrders/>)}
            </div>
            <SocialMedia/>
            <Footer/>
        </div>
    )
}

export default UserPanelPage;