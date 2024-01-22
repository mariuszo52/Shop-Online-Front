import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartShopping, faHeart, faUser} from '@fortawesome/free-solid-svg-icons'
import logo from "../images/logo.jpg"
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useCart} from "../context/CartContext";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import {useTranslation} from "react-i18next";

function Menu() {
    const navigate = useNavigate();
    const {setIsCartVisible} = useCart();
    const [menuElements, setMenuElements] = useState([])
    const {t, i18n} = useTranslation()

    function onCartIconClick() {
        if (window.location.pathname === "/checkout") {
            navigate("/cart")
        } else if (window.location.pathname !== "/cart")
            setIsCartVisible(true)

    }

    useEffect(() => {
        function fetchMenuElements(){
            axios.get("http://localhost:8080/platform/all-devices")
                .then(response => setMenuElements(response.data))
                .catch(reason => console.log(reason))
        }
        fetchMenuElements()
    }, []);

    function onUserIconClick() {
        if (!sessionStorage.getItem("jwt")) {
            window.location.href = "/account/login";
        } else if (sessionStorage.getItem("jwt")?.startsWith("Bearer")) {
            if(jwtDecode(sessionStorage.getItem("jwt"))?.role === "ADMIN") {
                window.location.href = "/account/admin-panel?tab=users";
            }else {
                window.location.href = "/account/user-panel?tab=my-account";
            }
        } else {
            window.location.href = "/account/user-panel?tab=my-account";
        }
    }

    function onFavIconClick() {
        window.location.href = "/account/user-panel?tab=wishlist";
    }

    function onSelectLanguageSubmit(event) {
        event.preventDefault()
        let language = event.target?.querySelector("select")?.value;
        i18n.changeLanguage(language).then(() => console.log("Language changed"))
    }

    return (
        <>
            <div className={"menu-div"}>
                <div className={"menu-panel"}>
                    {menuElements.map((menuElement, index) => (
                        <p key={index} onClick={() => navigate("/" + menuElement)}>{menuElement}</p>))}
                </div>
                <div className={"logo-div"}>
                    <img onClick={() => window.location.href = "/"} alt="logo" className={"logo"}
                         src={logo}/>
                </div>
                <div className={"user-panel"}>
                    <form onSubmit={event => onSelectLanguageSubmit(event)}
                          className={"select-language"}>
                        <select id={"select-language"}>
                            <option value={"pl"}>{t("language.polish")}</option>
                            <option value={"en"}>{t("language.english")}</option>
                        </select>
                        <button className={"select-language-button"}>{t("languageButton")}</button>
                    </form>
                    <FontAwesomeIcon onClick={onUserIconClick} className={"user-panel-icon"} icon={faUser}/>
                    <FontAwesomeIcon onClick={onFavIconClick} className={"user-panel-icon"} icon={faHeart}/>
                    <FontAwesomeIcon onClick={onCartIconClick} className={"user-panel-icon"} icon={faCartShopping}/>
                </div>
            </div>
        </>
    );
}

export default Menu;
