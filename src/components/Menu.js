import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faUser, faHeart } from '@fortawesome/free-solid-svg-icons'
import logo from "../images/logo.png"
function Menu() {
    return (
        <div className={"menu-div"}>
            <div className={"menu-panel"}>
                <a href={"#"}> <p>PC</p></a>
                <a href={"#"}> <p>PSN</p></a>
                <a href={"#"}> <p>XBOX</p></a>
                <a href={"#"}> <p>NINTENDO</p></a>
                <a href={"#"}> <p>TOP-UPS</p></a>
                </div>
            <div className={"logo-div"}>
                <img className={"logo"} src={logo}/>
            </div>
            <div className={"user-panel"}>
                <a href={"#"}><FontAwesomeIcon icon={faUser}/></a>
                <a href={"#"}><FontAwesomeIcon icon={faHeart}/></a>
                <a href={"#"}><FontAwesomeIcon icon={faCartShopping} /></a>
            </div>
        </div>
    );
}

export default Menu;
