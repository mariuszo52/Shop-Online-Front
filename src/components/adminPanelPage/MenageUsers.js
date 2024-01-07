import {useEffect, useState} from "react";
import axios from "axios";
import {useNotification} from "../../context/NotificationContext";
import {useDeleteConfirm} from "../../context/DeleteConfirmContext";

function MenageUsers() {
    const [users, setUsers] = useState([])
    const [isElementClicked, setIsElementClicked] = useState(false)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [isEnabled, setIsEnabled] = useState(false)
    const [role, setRole] = useState("")
    const {setNotificationVisible, setNotificationText} = useNotification();
    const {setIsComponentVisible, setUserId} = useDeleteConfirm();

    useEffect(() => {
        function fetchAllUsers() {
            axios.get("http://localhost:8080/user-management/all-users")
                .then(response => {
                    setUsers(response.data)
                    console.log(response.data)
                })
                .catch(reason => console.log(reason))
        }

        fetchAllUsers()
    }, []);

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
    }


    function updateUserField(fieldName, userId, index) {
        let url;
        let value;
        switch (fieldName) {
            case "username":
                url = "http://localhost:8080/user-management/username"
                value = username
                break
            case "email":
                url = "http://localhost:8080/user-management/email"
                value = email
                break
            case "isEnabled":
                url = "http://localhost:8080/user-management/is-enabled"
                value = isEnabled
                break
            case "role":
                url = "http://localhost:8080/user-management/role"
                value = role
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
        updateUserField(fieldName, userId, index)
        setIsElementClicked(false)
    }

    function handleOnDeleteButtonClick(userId) {
        setUserId(userId)
        setIsComponentVisible(true)
    }

    return (
        <div className={"menu-my-account"}>
            <h1>USERS LIST</h1>
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
                {users?.map((user, index) => (
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
                                    value={username}
                                    onChange={event => setUsername(event.target.value)}
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
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                />
                            </form>
                            <span id={"edit-span-email" + index}>{user?.email}</span></td>
                        <td
                            className={"isEnabled"}
                            onClick={(event) =>
                                showElementEditor(index, "isEnabled", "form")}>
                            <form
                                onSubmit={event =>
                                    onUpdateSubmit(event, "isEnabled", user?.id, index)}
                                id={"edit-form-isEnabled" + index}
                                className={"edit-users-form"}>
                                <select onChange={(event) => {
                                    setIsEnabled(event.target.value);
                                }}
                                >
                                    <option value={"false"}>FALSE</option>
                                    <option value={"true"}>TRUE</option>
                                </select>
                                <button type={"submit"}>OK</button>
                            </form>
                            <span id={"edit-span-isEnabled" + index}>{user?.isEnabled.toString()}</span></td>
                        <td
                            className={"role"}
                            onClick={(event) =>
                                showElementEditor(index, "role", "form")}>
                            <form
                                onSubmit={event =>
                                    onUpdateSubmit(event, "role", user?.id, index)}
                                id={"edit-form-role" + index}
                                className={"edit-users-form"}>
                                <select onChange={(event) => {
                                    setRole(event.target.value);
                                }}
                                >
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
        </div>
    )
}

export default MenageUsers