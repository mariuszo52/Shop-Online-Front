import React, {useEffect, useState} from "react";
import axios from "axios";
import ChangePassword from "./ChangePassword";
import {useNotification} from "../../context/NotificationContext";
import ChangeUserInfo from "./ChangeUserInfo";
import ChangeAddress from "./ChangeAddress";
import DeleteAccount from "./DeleteAccount";
import DeleteAccountConfirm from "./DeleteAccountConfirm";
import {useTranslation} from "react-i18next";

function MyAccount(){
    const [userAccountInfo, setUserAccountInfo] = useState(null)
    const {setNotificationVisible, setNotificationText} = useNotification();
    const {t} = useTranslation()
    useEffect(() => {
        function fetchUserAccountInfo(){
            axios.get(process.env.REACT_APP_SERVER_URL + "/user")
                .then(response => setUserAccountInfo(response.data))
                .catch(reason => console.log(reason))
        }
        fetchUserAccountInfo()
    }, []);

    function handleChangePasswordButton() {
        window.scrollTo(0,0)
        if(sessionStorage.getItem("jwt").startsWith("FB")){
            setNotificationText(t("fbAuth"))
            setNotificationVisible(true);
        }
        else if(sessionStorage.getItem("jwt").startsWith("GOOGLE")){
            setNotificationText(t("googleAuth"))
            setNotificationVisible(true);
        }else {
        let forgetPasswordForm = document.getElementById("password-change-container");
        forgetPasswordForm.style.display = "flex";
            }
    }

    function handleChangeInfoButton() {
        let changeInfoButton = document.getElementById("user-info-change-container");
        changeInfoButton.style.display = "flex";
        window.scrollTo(0, 0)
    }

    function handleChangeAddressButton() {
        let forgetPasswordForm = document.getElementById("address-change-container");
        forgetPasswordForm.style.display = "flex";
        window.scrollTo(0,0)
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
        <h1>{t("myAccount")}</h1>
        <div className={"user-panel-header"}>
            <h3>{t("accountInfo")}</h3>
        </div>
        <div className={"account-information-div"}>
            <h4>{t("accountInfo")}</h4>
            {userAccountInfo?.name ?(<p className={"account-info-paragraph"}>{userAccountInfo?.name} {userAccountInfo?.lastName}</p>
            ):(
                <p className={"account-info-paragraph"}>{t("noData")}</p>
            )}
            {userAccountInfo?.email ?(<p className={"account-info-paragraph"}>{userAccountInfo?.email}</p>
            ):(
                <p className={"account-info-paragraph"}>{t("noData")}</p>
            )}
            <p className={"account-info-button"} onClick={handleChangeInfoButton}>{t("changeInfo")}</p>
            <p className={"account-info-button"} onClick={handleChangePasswordButton}>{t("changePassword")}</p>
        </div>
        <div className={"user-panel-header"}>
            <h3>{t("addressBook")}</h3>
            <p onClick={handleChangeAddressButton} className={"account-info-header-button"}>{t("editAddress")}</p>
        </div>
        <div className={"account-information-div"}>
            <h4>{t("defaultAddress")}</h4>
            {userAccountInfo?.name ?(<p className={"account-info-paragraph"}>{userAccountInfo?.name} {userAccountInfo?.lastName}</p>
                ):(
                <p className={"account-info-paragraph"}>{t("noData")}</p>
                )}
            {userAccountInfo?.address ?(<p className={"account-info-paragraph"}>{userAccountInfo?.address}</p>
                ) :(
                <p className={"account-info-paragraph"}>{t("noData")}</p>
                )}
            {userAccountInfo?.city ?(<p className={"account-info-paragraph"}>{userAccountInfo?.city}</p>
            ) :(
                <p className={"account-info-paragraph"}>{t("noData")}</p>
            )}
            {userAccountInfo?.country ?(<p className={"account-info-paragraph"}>{userAccountInfo?.country}</p>
            ) :(
                <p className={"account-info-paragraph"}>{t("noData")}</p>
            )}
            {userAccountInfo?.postalCode ?(<p className={"account-info-paragraph"}>{userAccountInfo?.postalCode }</p>
            ) :(
                <p className={"account-info-paragraph"}>{t("noData")}</p>
            )}
            {userAccountInfo?.phoneNumber ?(<p className={"account-info-paragraph"}>{userAccountInfo?.phoneNumber }</p>
            ) :(
                <p className={"account-info-paragraph"}>{t("noData")}</p>
            )}
        </div>
        <p onClick={handleAccountDeleteButton} id={"delete-account-button"} className={"account-info-button"}>{t("deleteAccount")}</p>
    </div>
        </>
    )
}
export default MyAccount;