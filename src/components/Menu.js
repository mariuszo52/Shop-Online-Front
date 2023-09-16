import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faUser, faMagnifyingGlass, faHeart } from '@fortawesome/free-solid-svg-icons'
import logo from "../images/logo.png"
function Menu() {
    return (
        <div className={"menu-div"}>
            <div className={"menu-panel"}>
                <p>Menu item</p>
                <p>Menu item</p>
                <p>Menu item</p>
                <p>Menu item</p>
                <p>Menu item</p>
                </div>
            <div className={"logo-div"}>
                <img className={"logo"} src={logo}/>
            </div>
            <div className={"user-panel"}>
                <a href={"#"}><FontAwesomeIcon icon={faUser}/></a>
                <a href={"#"}><FontAwesomeIcon icon={faMagnifyingGlass} /></a>
                <a href={"#"}><FontAwesomeIcon icon={faHeart}/></a>
                <a href={"#"}><FontAwesomeIcon icon={faCartShopping} /></a>
            </div>
        </div>
    );
}

export default Menu;
