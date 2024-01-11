import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNotification} from "../../context/NotificationContext";
import {useDeleteConfirm} from "../../context/DeleteConfirmContext";
import Pagination from "../Pagination";

function MenageOrders({
                         pagination, setIsElementClicked, onDeleteButtonClick,
                         showElementEditor, closeForm, calculatePageNumbers
                     }) {
    const [orders, setOrders] = useState(null)
    const {setNotificationVisible, setNotificationText} = useNotification();
    const {index} = useDeleteConfirm();
    const [page, setPage] = useState(0)

    useEffect(() => {
        const params = {
            page: page
        }

        function fetchAllOrders() {
            axios.get("http://localhost:8080/admin/order-management/all-orders", {params})
                .then(response => {
                    setOrders(response.data)
                    calculatePageNumbers(response.data)
                    console.log(response.data)
                })
                .catch(reason => console.log(reason))
        }

        fetchAllOrders()
    }, [index, page]);


    function onSearchFormSubmit(event) {


    }

    function onUpdateSubmit(event, userId, id, index) {

    }

    return (
        <div className={"menu-my-account"}>
            <h1>ORDERS LIST</h1>
            <form
                onSubmit={event => onSearchFormSubmit(event)}
                className={"admin-panel-search-form"}>
                <input
                    required={true}
                    type={"text"}/>
                <select>
                    <option value={"id"}>ID</option>
                    <option value={"name"}>USER ID</option>
                    <option value={"name"}>ORDER STATUS</option>
                </select>
                <button type={"submit"}>SEARCH</button>
            </form>
            <table className={"manage-orders-table"}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>USER ID</th>
                    <th>ORDER STATUS</th>
                </tr>
                </thead>
                {orders?.content?.map((order, index) => (
                    <tbody key={index}>
                    <tr>
                        <td>{order?.id}</td>
                        <td
                            className={"user-id"}
                            onClick={event =>
                                showElementEditor(index, "name", "input")}
                        >
                            <form
                                onSubmit={event =>
                                    onUpdateSubmit(event, "userId", order?.id, index)}
                                id={"edit-form-userId" + index}
                                className={"edit-orders-form"}>
                                <input
                                    required={true}
                                />
                            </form>
                            <span id={"edit-span-name" + index}>{order?.userId}</span></td>
                        <td
                            className={"order-status"}
                            onClick={(event) =>
                                showElementEditor(index, "orderStatus", "input")}>
                            <form
                                onSubmit={event =>
                                    onUpdateSubmit(event, "orderStatus", order?.orderStatus , index)}
                                id={"edit-form-order-status" + index}
                                className={"edit-products-form"}>
                                <input
                                    required={true}
                                />
                            </form>
                            <span id={"edit-span-orderStatus" + index}>{order?.orderStatus}</span></td>
                    </tr>
                    </tbody>
                ))}
            </table>
            <Pagination
                productsPageable={orders}
                pagination={pagination}
                currentPage={page}
                setCurrentPage={setPage}
                currentSize={50}
            />
        </div>
    )
}

export default MenageOrders