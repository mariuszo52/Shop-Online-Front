import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartShopping, faHeart, faUser} from '@fortawesome/free-solid-svg-icons'
import logo from "../images/logo.png"
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {useCart} from "../context/CartContext";

function Menu({menuId}) {
    const navigate = useNavigate();
    const {setIsCartVisible} = useCart();

    function onCartIconClick() {
        setIsCartVisible(true)
    }

    function onUserIconClick() {
        /*later add if user logged show user panel, now show login page */
        navigate("/account/login")
    }
    return (
        <>
            <div id ={menuId} className={"menu-div"}>
                <div className={"menu-panel"}>
                    <p onClick={() => navigate("/PC")}>PC</p>
                    <p onClick={() => navigate("/PSN")}>PSN</p>
                    <p onClick={() => navigate("/XBOX")}>XBOX</p>
                    <p onClick={() => navigate("/NINTENDO")}>NINTENDO</p>
                    <p onClick={() => navigate("/ROCKSTAR-GAMES")}>ROCKSTAR GAMES</p>
                    <p onClick={() => navigate("/OTHERS")}>OTHER</p>
                </div>
                <div className={"logo-div"}>
                    <img onClick={() => navigate("/")} alt="logo" className={"logo"} src={logo}/>
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
