import React, {useEffect, useState} from "react";
import axios from "axios";
import ChangePassword from "./ChangePassword";
import {useNotification} from "../../context/NotificationContext";
import ChangeUserInfo from "./ChangeUserInfo";
import ChangeAddress from "./ChangeAddress";
import DeleteAccount from "./DeleteAccount";
import DeleteAccountConfirm from "./DeleteAccountConfirm";

function MyAccount(){
    const [userAccountInfo, setUserAccountInfo] = useState(null)
    const {setNotificationVisible, setNotificationText} = useNotification();

    useEffect(() => {
        function fetchUserAccountInfo(){
            axios.get("http://localhost:8080/user")
                .then(response => setUserAccountInfo(response.data))
                .catch(reason => console.log(reason))
        }
        fetchUserAccountInfo()
    }, []);

    function handleChangePasswordButton() {
        if(sessionStorage.getItem("jwt").startsWith("FB")){
            setNotificationText("Unfortunately, you cannot change your password as you are using Facebook authentication.")
            setNotificationVisible(true);
        }
        else if(sessionStorage.getItem("jwt").startsWith("GOOGLE")){
            setNotificationText("Unfortunately, you cannot change your password as you are using Google authentication.")
            setNotificationVisible(true);
        }else {
        let forgetPasswordForm = document.getElementById("password-change-container");
        forgetPasswordForm.style.display = "flex";
            }
    }

    function handleChangeInfoButton() {
        let forgetPasswordForm = document.getElementById("user-info-change-container");
        forgetPasswordForm.style.display = "flex";
    }

    function handleChangeAddressButton() {
        let forgetPasswordForm = document.getElementById("address-change-container");
        forgetPasswordForm.style.display = "flex";
    }
    function handleAccountDeleteButton() {
        let token = sessionStorage.getItem("jwt");
        if(token.startsWith("FB") ||token.startsWith("GOOGLE")){
            let form = document.getElementById("account-delete-confirm-container");
            form.style.display = "flex";
        }else {
            let form = document.getElementById("account-delete-container");
            form.style.display = "flex";
        }
        window.scrollTo({top: 0})
    }

    return(
        <>
    <div className={"menu-my-account"}>
        <ChangePassword />
        <ChangeUserInfo />
        <ChangeAddress />
        <DeleteAccount />
        <DeleteAccountConfirm />
        <h1>MY ACCOUNT</h1>
        <div className={"my-account-header"}>
            <h3>ACCOUNT INFORMATION</h3>
        </div>
        <div className={"account-information-div"}>
            <h4>ACCOUNT INFORMATION</h4>
            {userAccountInfo?.name ?(<p className={"account-info-paragraph"}>{userAccountInfo?.name} {userAccountInfo?.lastName}</p>
            ):(
                <p className={"account-info-paragraph"}>NO DATA AVAILABLE</p>
            )}
            {userAccountInfo?.email ?(<p className={"account-info-paragraph"}>{userAccountInfo?.email}</p>
            ):(
                <p className={"account-info-paragraph"}>NO DATA AVAILABLE</p>
            )}
            <p className={"account-info-button"} onClick={handleChangeInfoButton}>EDIT INFORMATION</p>
            <p className={"account-info-button"} onClick={handleChangePasswordButton}>CHANGE PASSWORD</p>
        </div>
        <div className={"my-account-header"}>
            <h3>ADDRESS BOOK</h3>
            <p onClick={handleChangeAddressButton} className={"account-info-header-button"}>EDIT ADDRESS</p>
        </div>
        <div className={"account-information-div"}>
            <h4>DEFAULT SHIPPING ADDRESS</h4>
            {userAccountInfo?.name ?(<p className={"account-info-paragraph"}>{userAccountInfo?.name} {userAccountInfo?.lastName}</p>
                ):(
                <p className={"account-info-paragraph"}>NO DATA AVAILABLE</p>
                )}
            {userAccountInfo?.address ?(<p className={"account-info-paragraph"}>{userAccountInfo?.address}</p>
                ) :(
                <p className={"account-info-paragraph"}>NO DATA AVAILABLE</p>
                )}
            {userAccountInfo?.city ?(<p className={"account-info-paragraph"}>{userAccountInfo?.city}</p>
            ) :(
                <p className={"account-info-paragraph"}>NO DATA AVAILABLE</p>
            )}
            {userAccountInfo?.country ?(<p className={"account-info-paragraph"}>{userAccountInfo?.country}</p>
            ) :(
                <p className={"account-info-paragraph"}>NO DATA AVAILABLE</p>
            )}
            {userAccountInfo?.postalCode ?(<p className={"account-info-paragraph"}>{userAccountInfo?.postalCode }</p>
            ) :(
                <p className={"account-info-paragraph"}>NO DATA AVAILABLE</p>
            )}
            {userAccountInfo?.phoneNumber ?(<p className={"account-info-paragraph"}>{userAccountInfo?.phoneNumber }</p>
            ) :(
                <p className={"account-info-paragraph"}>NO DATA AVAILABLE</p>
            )}
        </div>
        <p onClick={handleAccountDeleteButton} id={"delete-account-button"} className={"account-info-button"}>DELETE ACCOUNT</p>
    </div>
        </>
    )
}
export default MyAccount;