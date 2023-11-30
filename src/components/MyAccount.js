import React, {useEffect, useState} from "react";
import axios from "axios";

function MyAccount(){
    const [userAccountInfo, setUserAccountInfo] = useState(null)

    useEffect(() => {
        function fetchUserAccountInfo(){
            axios.get("http://localhost:8080/user")
                .then(response => setUserAccountInfo(response.data))
                .catch(reason => console.log(reason))
        }
        fetchUserAccountInfo()
    }, []);

    function handleChangePasswordButton() {
        let forgetPasswordForm = document.getElementById("password-change-container");
        forgetPasswordForm.style.display = "flex";
    }

    return(
        <>
    <div className={"menu-my-account"}>
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
            <p className={"account-info-button"}>EDIT INFORMATION</p>
            <p className={"account-info-button"} onClick={handleChangePasswordButton}>CHANGE PASSWORD</p>
        </div>
        <div className={"my-account-header"}>
            <h3>ADDRESS BOOK</h3>
            <p className={"account-info-header-button"}>MANAGE ADDRESSES</p>
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
        <p id={"delete-account-button"} className={"account-info-button"}>DELETE ACCOUNT</p>
    </div>
        </>
    )
}
export default MyAccount;