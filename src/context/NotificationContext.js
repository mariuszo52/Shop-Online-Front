import React, {createContext, useContext, useEffect, useState} from "react";
import {wait} from "@testing-library/user-event/dist/utils";
import {useTranslation} from "react-i18next";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [notificationText, setText] = useState("");
    const {t} = useTranslation()

    function setNotificationVisible(){
        setIsNotificationVisible(true);
        setTimeout( () => setIsNotificationVisible(false), 3000)

    }
    function setNotificationText(text){
        if (typeof text === "string"){
            setText(text)
        }else {
            setText(t("error"))
        }
    }


    return (
        <NotificationContext.Provider
            value={{
                isNotificationVisible,
                setIsNotificationVisible,
                setNotificationVisible,
                notificationText,
                setNotificationText
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    return useContext(NotificationContext);
}
