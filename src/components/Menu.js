import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartShopping, faHeart, faUser} from '@fortawesome/free-solid-svg-icons'
import logo from "../images/logo.jpg"
import {useNavigate} from "react-router-dom";
import React from "react";
import {useCart} from "../context/CartContext";
import {jwtDecode} from "jwt-decode";

function Menu() {
    const navigate = useNavigate();
    const {setIsCartVisible} = useCart();

    function onCartIconClick() {
        if (window.location.pathname === "/checkout") {
            navigate("/cart")
        } else if (window.location.pathname !== "/cart")
            setIsCartVisible(true)

    }

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

    return (
        <>
            <div className={"menu-div"}>
                <div className={"menu-panel"}>
                    <p onClick={() => navigate("/PC")}>PC</p>
                    <p onClick={() => navigate("/PSN")}>PSN</p>
                    <p onClick={() => navigate("/XBOX")}>XBOX</p>
                    <p onClick={() => navigate("/NINTENDO")}>NINTENDO</p>
                    <p onClick={() => navigate("/OTHERS")}>OTHER</p>
                    <p onClick={() => navigate("/ROCKSTAR-GAMES")}>ROCKSTAR</p>
                </div>
                <div className={"logo-div"}>
                    <img onClick={() => window.location.href = "/"} alt="logo" className={"logo"}
                         src={logo}/>
                </div>
                <div className={"user-panel"}>
                    <FontAwesomeIcon onClick={onUserIconClick} className={"user-panel-icon"} icon={faUser}/>
                    <FontAwesomeIcon onClick={onFavIconClick} className={"user-panel-icon"} icon={faHeart}/>
                    <FontAwesomeIcon onClick={onCartIconClick} className={"user-panel-icon"} icon={faCartShopping}/>
                </div>
            </div>
        </>
    );
}

export default Menu;
