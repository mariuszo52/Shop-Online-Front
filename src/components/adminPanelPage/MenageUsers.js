import {useEffect, useState} from "react";
import axios from "axios";
import EditPanel from "./EditPanel";

function MenageUsers() {
    const [users, setUsers] = useState([])
    const [isElementClicked, setIsElementClicked] = useState(false)
    const [editInputValue, setEditInputValue] = useState("")

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

    function onListElementClick(index, name) {
        if (!isElementClicked) {
            let span = document.getElementById("edit-span-" + name + index)
            let form = document.getElementById("edit-form-" + name + index);
            let input = form.getElementsByTagName("input").item(0);
            span.style.display = "none"
            form.style.display = "flex"
            setIsElementClicked(true)
            input.focus()
            input.addEventListener("blur", ev => closeForm(form, span) )
        }
    }
    function closeForm(form, span){
        span.style.display = "flex"
        form.style.display = "none"
        setIsElementClicked(false)

    }


    function updateUserField(fieldName, userId, index) {
        let url;
        switch (fieldName){
            case "username": url = "http://localhost:8080/user-management/username"
                break
            case "email": url = "http://localhost:8080/user-management/email"
        }
        let data = {
            userId: userId,
            [fieldName]: editInputValue
        }
        axios.put(url, data)
            .then(response => {
                let span = document.getElementById("edit-span-" + fieldName + index)
                let form = document.getElementById("edit-form-" + fieldName + index);
                span.style.display = "flex"
                form.style.display = "none"
            })
            .catch(reason => console.log(reason))
    }


    function onUpdateSubmit (event, fieldName, userId, index) {
        event.preventDefault()
        updateUserField(fieldName, userId, index)
        setIsElementClicked(false)
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
                </tr>
                </thead>
                {users?.map((user, index) => (
                    <tbody key={index}>
                    <tr>
                        <td>{user?.id}</td>
                        <td
                            className={"username"}
                            onClick={event =>
                                onListElementClick(index, "username")}
                        ><form
                            onSubmit={event =>
                                onUpdateSubmit(event, "username", user?.id, index)}
                            id={"edit-form-username" + index}
                            className={"edit-users-form"}>
                            <input
                                required={true}
                                value={editInputValue}
                                onChange={event => setEditInputValue(event.target.value)}
                            />
                        </form>
                            <span id={"edit-span-username" + index}>{user?.username}</span></td>
                        <td
                            className={"email"}
                            onClick={(event) =>
                                onListElementClick(index, "email")}>
                            <form
                                id={"edit-form-email" + index}
                                className={"edit-users-form"}>
                                <input
                                    required={true}
                                    value={editInputValue}
                                    onChange={event => setEditInputValue(event.target.value)}
                                />
                            </form>
                            <span id={"edit-span-email" + index}>{user?.email}</span></td>
                        <td>{user?.isEnabled.toString()}</td>
                        <td>{user?.userRole}</td>
                        <td>{user?.userInfo.id}</td>
                    </tr>
                    </tbody>
                ))}
            </table>
        </div>
    )
}

export default MenageUsers