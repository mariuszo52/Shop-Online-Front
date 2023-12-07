import Menu from "../components/Menu";
import SocialMedia from "../components/SocialMedia";
import Footer from "../components/Footer";
import React, {useState} from "react";
import MyAccount from "../components/UserPanelPage/MyAccount";
import MyOrders from "../components/MyOrders";

function UserPanelPage() {
    const [activeMenuTab, setActiveMenuTab] = useState("MY ACCOUNT")
    function chooseActiveTab(event){
        setActiveMenuTab(event.target.innerText)
        }

    return (
        <div className={"main-div"}>
            <Menu/>
            <div className={"account-panel-container"}>
                <div className={"account-menu"}>
                    <p onClick={event => chooseActiveTab(event)}
                       className={"account-menu-el"}>MY ACCOUNT</p>
                    <p onClick={event => chooseActiveTab(event)}
                       className={"account-menu-el"}>MY ORDERS</p>
                    <p className={"account-menu-el"}>WISHLIST</p>
                    <p className={"account-menu-el"}>MESSAGES</p>
                    <p className={"account-menu-el"}>LOGOUT</p>
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