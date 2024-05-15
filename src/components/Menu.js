import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartShopping, faHeart, faUser} from '@fortawesome/free-solid-svg-icons'
import logo from "../images/logo.png"
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useCart} from "../context/CartContext";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import {useTranslation} from "react-i18next";
import menu from "../images/menu.png"

function Menu() {
    const navigate = useNavigate();
    const {setIsCartVisible} = useCart();
    const [menuElements, setMenuElements] = useState([])
    const {t, i18n} = useTranslation()
    const [width, setWidth] = useState(window.innerWidth)



    function onCartIconClick() {
        if (window.location.pathname === "/checkout") {
            navigate("/cart")
        } else if (window.location.pathname !== "/cart")
            setIsCartVisible(true)

    }

    useEffect(() => {
        function fetchMenuElements() {
            axios.get(process.env.REACT_APP_SERVER_URL + "/platform/all-devices")
                .then(response => setMenuElements(response.data))
                .catch(reason => console.log(reason))
        }

        fetchMenuElements()
    }, []);

    function onUserIconClick() {
        if (!sessionStorage.getItem("jwt")) {
            window.location.href = "/account/login";
        } else if (sessionStorage.getItem("jwt")?.startsWith("Bearer")) {
            if (jwtDecode(sessionStorage.getItem("jwt"))?.role === "ADMIN") {
                window.location.href = "/account/admin-panel?tab=users";
            } else {
                window.location.href = "/account/user-panel?tab=my-account";
            }
        } else {
            window.location.href = "/account/user-panel?tab=my-account";
        }
    }

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWidth(window.innerWidth)
        })
        let menuDiv = document.getElementsByClassName("menu-div")?.item(0);
        let menuPanel = document.getElementsByClassName("menu-panel")?.item(0);
        if(window.innerWidth >= 1000){
            menuPanel.style.display = "flex"
            menuDiv.style.flexDirection = "row";
            menuPanel.style.width = "50%";
        } else {
            menuPanel.style.display = "none"
            menuDiv.style.flexDirection = "column";
            menuPanel.style.width = "100%";
        }

    }, [width]);

    function onFavIconClick() {
        window.location.href = "/account/user-panel?tab=wishlist";
    }

    function onSelectLanguageSubmit(event) {
        event.preventDefault()
        let language = event.target?.querySelector("select")?.value;
        i18n.changeLanguage(language).then(() => console.log("Language changed to: " + language) )
    }

    function onMenuClick() {
        let menuPanel = document.querySelectorAll(".menu-panel").item(0);
        menuPanel?.style.display === "flex" ? menuPanel.style.display = "none" : menuPanel.style.display = "flex"
    }

    return (
        <>
            <div className={"menu-div"}>
                <div className={"main-menu"}>
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
                    <div className={"logo-div"}>
                        <img onClick={() => window.location.href = "/"} alt="logo" className={"logo"}
                             src={logo}/>
                        <img onClick={onMenuClick}
                             className={"menu-icon"} alt={"menu"} src={menu}/>
                    </div>
                </div>
                <div className={"menu-panel"}>
                    {menuElements.map((menuElement, index) => (
                        <p key={index} onClick={() => navigate("/" + menuElement)}>{menuElement}</p>))}
                </div>
            </div>


        </>
    );
}

export default Menu;
