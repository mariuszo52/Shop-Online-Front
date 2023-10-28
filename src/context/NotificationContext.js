import React, {createContext, useContext, useEffect, useState} from "react";
import {wait} from "@testing-library/user-event/dist/utils";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [notificationText, setNotificationText] = useState("");

    function setNotificationVisible(){
        setIsNotificationVisible(true);
        setTimeout( () => setIsNotificationVisible(false), 3000)

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
