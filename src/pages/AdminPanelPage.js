import Menu from "../components/Menu";
import MenageUsers from "../components/adminPanelPage/MenageUsers";
import MenageProducts from "../components/adminPanelPage/MenageProducts";
import MenageOrders from "../components/adminPanelPage/MenageOrders";
import SocialMedia from "../components/SocialMedia";
import Footer from "../components/Footer";
import {useEffect, useState} from "react";
import axios from "axios";
import pagination from "../components/Pagination";

function AdminPanelPage() {
    const [activeMenuTab, setActiveMenuTab] = useState("users")
    const [pagination, setPagination] = useState([])
    const [isElementClicked, setIsElementClicked] = useState(false)



    function chooseActiveTab(event) {
        let tabName = event.target.innerText?.replace(" ", "-").toLowerCase();
        window.location.href = "/account/admin-panel?tab=" + tabName;
    }



    useEffect(() => {
        function checkActiveTab() {
            let queryString = window.location.search;
            let urlSearchParams = new URLSearchParams(queryString);
            let tab = urlSearchParams.get("tab");
            setActiveMenuTab(tab)
            let menuElements = document.getElementsByClassName("account-menu-el");
            for (let menuElement of menuElements) {
                menuElement.style.color = "white";
            }
            let selectedMenuElement = document.getElementById(tab);
            if (selectedMenuElement !== null)
                selectedMenuElement.style.color = "#0d7edc";
        }
        checkActiveTab()
    }, []);

    function onLogoutClick() {
        sessionStorage.removeItem("jwt")
        sessionStorage.removeItem("refreshToken")
        window.location.href = "http://localhost:3000/account/login"
    }
    function calculatePageNumbers(data) {
        const numbers = [];
        for (let i = 0; i < data?.totalPages; i++) {
            numbers.push(i);
        }
        setPagination(numbers);
    }
    function showElementEditor(index, name, focusElementName) {
        if (!isElementClicked) {
            let span = document.getElementById("edit-span-" + name + index)
            let form = document.getElementById("edit-form-" + name + index);
            let focusElement
            if (focusElementName === "form") {
                focusElement = form
            } else {
                focusElement = form.getElementsByTagName(focusElementName).item(0);
            }
            span.style.display = "none"
            form.style.display = "flex"
            setIsElementClicked(true)
            focusElement.focus()
            focusElement.addEventListener("blur", ev => closeForm(form, span))
        }
    }
    function closeForm(form, span) {
        span.style.display = "flex"
        form.style.display = "none"
        setIsElementClicked(false)
    }
    return (
        <div className={"main-div"}>
            <Menu/>
            <div className={"account-panel-container"}>
                <div className={"account-menu"}>
                    <p id={"users"} onClick={event => chooseActiveTab(event)}
                       className={"account-menu-el"}>USERS</p>
                    <p id={"products"} onClick={event => chooseActiveTab(event)}
                       className={"account-menu-el"}>PRODUCTS</p>
                    <p id={"orders"} onClick={event => chooseActiveTab(event)}
                       className={"account-menu-el"}>ORDERS</p>
                    <p className={"account-menu-el"} onClick={onLogoutClick}>LOGOUT</p>
                </div>
                {activeMenuTab === "users" && (
                    <MenageUsers
                    pagination = {pagination}
                    showElementEditor = {showElementEditor}
                    setIsElementClicked = {setIsElementClicked}
                    closeForm = {closeForm}
                    calculatePageNumbers = {calculatePageNumbers}
                    />)}
                {activeMenuTab === "products" && (
                    <MenageProducts
                        pagination = {pagination}
                        showElementEditor = {showElementEditor}
                        setIsElementClicked = {setIsElementClicked}
                        closeForm = {closeForm}
                        calculatePageNumbers = {calculatePageNumbers}
                    />)}
                {activeMenuTab === "orders" && (<MenageOrders pagination = {pagination}/>)}
            </div>
            <SocialMedia/>
            <Footer/>
        </div>
    )
}

export default AdminPanelPage;