import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartShopping, faHeart, faUser} from '@fortawesome/free-solid-svg-icons'
import logo from "../images/logo.jpg"
import {useNavigate} from "react-router-dom";
import React from "react";
import {useCart} from "../context/CartContext";

function Menu() {
    const navigate = useNavigate();
    const {setIsCartVisible} = useCart();

    function onCartIconClick() {
        if(window.location.href !== "http://localhost:3000/cart")
        setIsCartVisible(true)
    }

    function onUserIconClick() {
        if (sessionStorage.getItem("jwt")) {
            navigate("/account/my-account")
        } else {
            navigate("/account/login")
        }
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
                    <img onClick={() => window.location.href = "http://localhost:3000"} alt="logo" className={"logo"} src={logo}/>
                </div>
                <div className={"user-panel"}>
                    <FontAwesomeIcon onClick={onUserIconClick} className={"user-panel-icon"} icon={faUser}/>
                    <FontAwesomeIcon className={"user-panel-icon"} icon={faHeart}/>
                    <FontAwesomeIcon onClick={onCartIconClick} className={"user-panel-icon"} icon={faCartShopping}/>
                </div>
            </div>
        </>
    );
}

export default Menu;
