import React, {createContext, useContext, useState} from "react";
import axios from "axios";
import {useNotification} from "./NotificationContext";
import {useTranslation} from "react-i18next";
import {useTranslate} from "./TranslateContext";

const DeleteConfirmContext = createContext();

export function DeleteConfirmProvider({children}) {
    const [isComponentVisible, setIsComponentVisible] = useState(false)
    const {setNotificationVisible, setNotificationText} = useNotification();
    const [index, setIndex] = useState(0)
    const [id, setId] = useState(null)
    const [paramName, setParamName] = useState("")
    const {t} = useTranslation()
    const {translate} = useTranslate()


    function handleUserDeleteConfirm() {
        let url
        switch (paramName) {
            case "userId":
                url = process.env.REACT_APP_SERVER_URL + "/admin/user-management/user"
                break
            case "productId":
                url = process.env.REACT_APP_SERVER_URL + "/admin/product-management/product"
                break
        }
        const params = {
            [paramName]: id
        }
        axios.delete(url, {params})
            .then(response => {
                setNotificationText(t("done"))
                setNotificationVisible()
                setIsComponentVisible(false)
                setIndex(prevState => prevState + 1)
            }).catch(err => {
            translate(err.response.data)
                .then(translation => {
                    setNotificationText(translation)
                    setNotificationVisible(true)
                })
                .catch(translationErr => console.log(translationErr))
            console.log(err)
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
