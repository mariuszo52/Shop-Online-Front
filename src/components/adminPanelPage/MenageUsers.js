import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNotification} from "../../context/NotificationContext";
import {useDeleteConfirm} from "../../context/DeleteConfirmContext";
import Pagination from "../Pagination";

function MenageUsers() {
    const [users, setUsers] = useState([])
    const [isElementClicked, setIsElementClicked] = useState(false)
    const {setNotificationVisible, setNotificationText} = useNotification();
    const {setIsComponentVisible, setUserId, index} = useDeleteConfirm();
    const [page, setPage] = useState(0)
    const [pagination, setPagination] = useState([])

    useEffect(() => {
        const params = {
            page: page
        }
        function fetchAllUsers() {
            axios.get("http://localhost:8080/user-management/all-users", {params})
                .then(response => {
                    setUsers(response.data)
                    calculatePageNumbers(response.data)
                    console.log(response.data)
                })
                .catch(reason => console.log(reason))
        }

        fetchAllUsers()
    }, [index, page]);

    function calculatePageNumbers(data) {
        const numbers = [];
        for (let i = 0; i < data?.totalPages; i++) {
            numbers.push(i);
        }
        setPagination(numbers);
    }

    function showElementEditor(index, name, focusElementName) {
        if (!isElementClicked) {
            let span = document.getElementById("edit-span-" + name + index)
            let form = document.getElementById("edit-form-" + name + index);
            let focusElement
            if (focusElementName === "form") {
                focusElement = form
            } else {
                focusElement = form.getElementsByTagName(focusElementName).item(0);
            }
            span.style.display = "none"
            form.style.display = "flex"
            setIsElementClicked(true)
            focusElement.focus()
            focusElement.addEventListener("blur", ev => closeForm(form, span))
        }
    }

    function closeForm(form, span) {
        span.style.display = "flex"
        form.style.display = "none"
        setIsElementClicked(false)
    }


    function updateUserField(event, fieldName, userId, index) {
        let url;
        let value;
        switch (fieldName) {
            case "username":
                url = "http://localhost:8080/user-management/username"
                value = event.target.querySelector("input")?.value
                break
            case "email":
                url = "http://localhost:8080/user-management/email"
                value = event.target.querySelector("input")?.value
                break
            case "isEnabled":
                url = "http://localhost:8080/user-management/is-enabled"
                value = event.target.querySelector("select")?.value
                break
            case "role":
                url = "http://localhost:8080/user-management/role"
                value = event.target.querySelector("select")?.value
        }
        let data = {
            userId: userId,
            [fieldName]: value
        }
        axios.put(url, data)
            .then(response => {
                let span = document.getElementById("edit-span-" + fieldName + index)
                let form = document.getElementById("edit-form-" + fieldName + index);
                span.innerText = value;
                span.style.display = "flex"
                form.style.display = "none"
                setIsElementClicked(false)
            })
            .catch(reason => {
                setNotificationText(reason.response.data)
                setNotificationVisible(true)
                console.log(reason)
            })
    }

    function onUpdateSubmit(event, fieldName, userId, index) {
        event.preventDefault()
        updateUserField(event, fieldName, userId, index)
        setIsElementClicked(false)
    }

    function handleOnDeleteButtonClick(userId) {
        setUserId(userId)
        setIsComponentVisible(true)
    }

    function onSearchFormSubmit(event) {
        event.preventDefault()
        const params = {
            searchBy: event.target?.querySelector("select")?.value,
            value: event.target?.querySelector("input")?.value
        }
        axios.get("http://localhost:8080/user-management/user", {params})
            .then(response => setUsers(new Array(response.data)))
            .catch(reason => {
                console.log(reason)
                setNotificationText(reason.response.data)
                setNotificationVisible()
            })
    }

    return (
        <div className={"menu-my-account"}>
            <h1>USERS LIST</h1>
            <form
                onSubmit={event => onSearchFormSubmit(event)}
                className={"admin-panel-search-form"}>
                <input
                    required={true}
                    type={"text"}/>
                <select>
                    <option value={"id"}>ID</option>
                    <option value={"username"}>USERNAME</option>
                    <option value={"email"}>EMAIL</option>
                </select>
                <button type={"submit"}>SEARCH</button>
            </form>
            <table className={"manage-users-table"}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>USERNAME</th>
                    <th>EMAIL</th>
                    <th>IS ENABLED</th>
                    <th>ROLE</th>
                    <th>INFO ID</th>
                    <th>OPTIONS</th>
                </tr>
                </thead>
                {users?.content?.map((user, index) => (
                    <tbody key={index}>
                    <tr>
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
                                onSubmit={event =>{
                                    onUpdateSubmit(event, "isEnabled", user?.id, index)}}
                                id={"edit-form-isEnabled" + index}
                                className={"edit-users-form"}>
                                <select>
                                    <option value={"true"}>TRUE</option>
                                    <option value={"false"}>FALSE</option>
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
                                    <option value={"USER"}>USER</option>
                                </select>
                                <button type={"submit"}>OK</button>
                            </form>
                            <span id={"edit-span-role" + index}>{user?.userRole}</span></td>
                        <td>{user?.userInfo.id}</td>
                        <td onClick={() => handleOnDeleteButtonClick(user?.id)}>DELETE</td>
                    </tr>
                    </tbody>
                ))}
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