import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNotification} from "../../context/NotificationContext";
import {useDeleteConfirm} from "../../context/DeleteConfirmContext";
import Pagination from "../Pagination";
import {useTranslation} from "react-i18next";
import {useTranslate} from "../../context/TranslateContext";

function MenageUsers({
                         pagination, setIsElementClicked, onDeleteButtonClick,
                         showElementEditor, closeForm, calculatePageNumbers
                     }) {
    const [users, setUsers] = useState(null)
    const {setNotificationVisible, setNotificationText} = useNotification();
    const {index} = useDeleteConfirm();
    const [page, setPage] = useState(0)
    const {t} = useTranslation()
    const {translate} = useTranslate()


    useEffect(() => {
        const params = {
            page: page
        }

        function fetchAllUsers() {
            axios.get(process.env.REACT_APP_SERVER_URL + "/admin/user-management/all-users", {params})
                .then(response => {
                    setUsers(response.data)
                    calculatePageNumbers(response.data)
                })
                .catch(reason => console.log(reason))
        }

        fetchAllUsers()
    }, [index, page]);


    function updateUserField(event, fieldName, userId, index) {
        let url;
        let value;
        let span = document.getElementById("edit-span-" + fieldName + index)
        let form = document.getElementById("edit-form-" + fieldName + index);
        switch (fieldName) {
            case "username":
                url = process.env.REACT_APP_SERVER_URL + "/admin/user-management/username"
                value = event.target.querySelector("input")?.value
                break
            case "email":
                url = process.env.REACT_APP_SERVER_URL + "/admin/user-management/email"
                value = event.target.querySelector("input")?.value
                break
            case "isEnabled":
                url = process.env.REACT_APP_SERVER_URL + "/admin/user-management/is-enabled"
                value = event.target.querySelector("select")?.value
                break
            case "role":
                url = process.env.REACT_APP_SERVER_URL + "/admin/user-management/role"
                value = event.target.querySelector("select")?.value
        }
        let data = {
            userId: userId,
            [fieldName]: value
        }
        axios.put(url, data)
            .then(response => {
                span.innerText = value;
                span.style.display = "flex"
                form.style.display = "none"
                setIsElementClicked(false)
            })
            .catch(err => {
                translate(err.response.data)
                    .then(translation => {
                        setNotificationText(translation)
                        setNotificationVisible(true)
                    })
                    .catch(translationErr => console.log(translationErr))
                console.log(err)
            })
    }

    function onUpdateSubmit(event, fieldName, userId, index) {
        event.preventDefault()
        updateUserField(event, fieldName, userId, index)
        setIsElementClicked(false)
    }


    function onSearchFormSubmit(event) {
        event.preventDefault()
        const params = {
            searchBy: event.target?.querySelector("select")?.value,
            value: event.target?.querySelector("input")?.value
        }
        axios.get(process.env.REACT_APP_SERVER_URL + "/admin/user-management/user", {params})
            .then(response => setUsers({content: new Array(response.data)}))
            .catch(reason => {
                console.log(reason)
                setNotificationText(t("userNotFound"))
                setNotificationVisible()
            })


    }


    return (
        <div className={"menu-my-account"}>
            <h1>{t("userList")}</h1>
            <form
                onSubmit={event => onSearchFormSubmit(event)}
                className={"admin-panel-search-form"}>
                <input
                    required={true}
                    type={"text"}/>
                <select>
                    <option value={"id"}>ID</option>
                    <option value={"username"}>{t("username")}</option>
                    <option value={"email"}>EMAIL</option>
                </select>
                <button type={"submit"}>{t("search")}</button>
            </form>
            <table className={"manage-users-table"}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>{t("username")}</th>
                    <th>EMAIL</th>
                    <th>{t("isEnabled")}</th>
                    <th>{t("role")}</th>
                    <th>INFO ID</th>
                    <th>{t("options")}</th>
                </tr>
                </thead>
                <tbody>
                {users?.content?.map((user, index) => (
                    <tr key={index}>
                        <td>{user?.id}</td>
                        <td
                            className={"username"}
                            onClick={event =>
                                showElementEditor(index, "username", "input")}
                        >
                            <form
                                onSubmit={event =>
                                    onUpdateSubmit(event, "username", user?.id, index)}
                                id={"edit-form-username" + index}
                                className={"edit-users-form"}>
                                <input
                                    required={true}
                                />
                            </form>
                            <span id={"edit-span-username" + index}>{user?.username}</span></td>
                        <td
                            className={"email"}
                            onClick={(event) =>
                                showElementEditor(index, "email", "input")}>
                            <form
                                onSubmit={event =>
                                    onUpdateSubmit(event, "email", user?.id, index)}
                                id={"edit-form-email" + index}
                                className={"edit-users-form"}>
                                <input
                                    type={"email"}
                                    required={true}
                                />
                            </form>
                            <span id={"edit-span-email" + index}>{user?.email}</span></td>
                        <td
                            className={"isEnabled"}
                            onClick={(event) =>
                                showElementEditor(index, "isEnabled", "form")}>
                            <form
                                onSubmit={event => {
                                    onUpdateSubmit(event, "isEnabled", user?.id, index)
                                }}
                                id={"edit-form-isEnabled" + index}
                                className={"edit-users-form"}>
                                <select>
                                    <option value={"true"}>{t("true")}</option>
                                    <option value={"false"}>{t("false")}</option>
                                </select>
                                <button type={"submit"}>OK</button>
                            </form>
                            <span id={"edit-span-isEnabled" + index}>{user?.isEnabled.toString()}</span></td>
                        <td
                            className={"role"}
                            onClick={(event) =>
                                showElementEditor(index, "role", "form")}>
                            <form
                                onSubmit={event => {
                                    onUpdateSubmit(event, "role", user?.id, index)
                                }}
                                id={"edit-form-role" + index}
                                className={"edit-users-form"}>
                                <select>
                                    <option value={"ADMIN"}>ADMIN</option>
                                    <option value={"USER"}>{t("user")}</option>
                                </select>
                                <button type={"submit"}>OK</button>
                            </form>
                            <span id={"edit-span-role" + index}>{user?.userRole}</span></td>
                        <td>{user?.userInfo.id}</td>
                        <td onClick={() => onDeleteButtonClick(user?.id, "userId")}>{t("delete")}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination
                productsPageable={users}
                pagination={pagination}
                currentPage={page}
                setCurrentPage={setPage}
                currentSize={50}
            />
        </div>
    )
}

export default MenageUsers