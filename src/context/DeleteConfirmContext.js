import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {useNotification} from "./NotificationContext";

const DeleteConfirmContext = createContext();

export function DeleteConfirmProvider({children}) {
    const [isComponentVisible, setIsComponentVisible] = useState(false)
    const {setNotificationVisible, setNotificationText} = useNotification();
    const [index, setIndex] = useState(0)
    const [id, setId] = useState(null)
    const [paramName, setParamName] = useState("")

    function handleUserDeleteConfirm(){
        let url
        switch (paramName){
            case "userId": url = "http://localhost:8080/admin/user-management/user"
                break
            case "productId": url = "http://localhost:8080/admin/product-management/product"
                break
        }
        const params = {
            [paramName]: id
        }
        axios.delete(url, {params} )
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
                setId,
                setParamName,
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
