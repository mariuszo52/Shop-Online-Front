import Menu from "../components/Menu";

function UserPanelPage() {
    return (
        <div className={"main-div"}>
            <Menu/>
            <div className={"account-panel-container"}>
            <div className={"account-menu"}>
            <p className={"account-menu-el"}>MY ACCOUNT</p>
                <p className={"account-menu-el"}>MY ORDERS</p>
                <p className={"account-menu-el"}>WISHLIST</p>
                <p className={"account-menu-el"}>MESSAGES</p>
                <p className={"account-menu-el"}>LOGOUT</p>
            </div>
                <div className={"menu-my-account"}>
                    <h1>MY ACCOUNT</h1>
                    <div className={"my-account-header"}>
                        <h3>ACCOUNT INFORMATION</h3>
                    </div>
                    <div className={"account-information-div"}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPanelPage;