import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {useNotification} from "./NotificationContext";

const DeleteConfirmContext = createContext();

export function DeleteConfirmProvider({children}) {
    const [isComponentVisible, setIsComponentVisible] = useState(false)
    const {setNotificationVisible, setNotificationText} = useNotification();
    const [index, setIndex] = useState(0)
    const [userId, setUserId] = useState(null)

    function handleUserDeleteConfirm(){
        const params = {
            userId: userId
        }
        axios.delete("http://localhost:8080/user-management/user", {params} )
            .then(response => {
                setNotificationText("Done")
                setNotificationVisible()
                setIsComponentVisible(false)
                setIndex(prevState => prevState +1)
            }).catch(reason => {
                console.log(reason)
            setNotificationText(reason.response.data)
            setNotificationVisible()
            setIsComponentVisible(false)
            })

    }

    return (
        <DeleteConfirmContext.Provider
            value={{
                isComponentVisible,
                setIsComponentVisible,
                handleUserDeleteConfirm,
                setUserId,
                index,
                setIndex
            }}
        >
            {children}
        </DeleteConfirmContext.Provider>
    );
}

export function useDeleteConfirm() {
    return useContext(DeleteConfirmContext);
}
