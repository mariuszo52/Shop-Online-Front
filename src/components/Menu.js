import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartShopping, faHeart, faUser} from '@fortawesome/free-solid-svg-icons'
import logo from "../images/logo.png"
import {useNavigate} from "react-router-dom";
import React from "react";
import {useCart} from "../context/CartContext";

function Menu() {
    const navigate = useNavigate();
    const {setIsCartVisible} = useCart();

    function cartIconClick() {
        setIsCartVisible(true)
    }
    return (
        <>
            <div className={"menu-div"}>
                <div className={"menu-panel"}>
                    <p onClick={() => navigate("/pc")}>PC</p>
                    <p onClick={() => navigate("/psn")}>PSN</p>
                    <p onClick={() => navigate("/xbox")}>XBOX</p>
                    <p onClick={() => navigate("/nintendo")}>NINTENDO</p>
                    <p onClick={() => navigate("/rockstar-games")}>ROCKSTAR GAMES</p>
                    <p onClick={() => navigate("/others")}>OTHER</p>
                </div>
                <div className={"logo-div"}>
                    <img onClick={() => navigate("/")} alt="logo" className={"logo"} src={logo}/>
                </div>
                <div className={"user-panel"}>
                    <FontAwesomeIcon className={"user-panel-icon"} icon={faUser}/>
                    <FontAwesomeIcon className={"user-panel-icon"} icon={faHeart}/>
                    <FontAwesomeIcon onClick={cartIconClick} className={"user-panel-icon"} icon={faCartShopping}/>
                </div>
            </div>
        </>
    );
}

export default Menu;
