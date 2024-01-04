import {useEffect, useState} from "react";
import axios from "axios";
import EditPanel from "./EditPanel";

function MenageUsers() {
    const [users, setUsers] = useState([])
    const [url, setUrl] = useState("")
    const [editPanelName, setEditPanelName] = useState("")
    const [selectedUser, setSelectedUser] = useState(null)

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

    function handleOpenEditForm() {
        let editPanelForm = document.getElementById("edit-field-container");
        editPanelForm.style.display = "flex";
    }

    function handleOnClick(event, user) {
        handleOpenEditForm()
        setSelectedUser(user)
        setEditPanelName(event.target.className)
        switch (event.target.className) {
            case "username":
                setUrl("http://localhost:8080/username")
                break
            case "email":
                setUrl("http://localhost:8080/user-management/email")
        }
    }

    return (
        <div className={"menu-my-account"}>
            <EditPanel
                url={url}
                userId={selectedUser?.id}
                name={editPanelName}
            />
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
                        <td className={"username"}
                            onClick={(event) =>
                                handleOnClick(event, user)}>
                            {user?.username}</td>
                        <td className={"email"}
                            onClick={(event) =>
                                handleOnClick(event, user)}>
                            {user?.email}</td>
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