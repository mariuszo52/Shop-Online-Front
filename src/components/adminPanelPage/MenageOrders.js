import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNotification} from "../../context/NotificationContext";
import {useDeleteConfirm} from "../../context/DeleteConfirmContext";
import Pagination from "../Pagination";
import OrderDetails from "./OrderDetails";

function MenageOrders({
                          pagination, setIsElementClicked,
                          showElementEditor, closeForm, calculatePageNumbers
                      }) {
    const [orders, setOrders] = useState(null)
    const {setNotificationVisible, setNotificationText} = useNotification();
    const {index} = useDeleteConfirm();
    const [page, setPage] = useState(0)
    const [orderStatuses, setOrderStatuses] = useState([])
    const [searchParam, setSearchParam] = useState("")
    useEffect(() => {
        const params = {
            page: page
        }

        function fetchAllOrders() {
            axios.get("http://localhost:8080/admin/order-management/all-orders", {params})
                .then(response => {
                    setOrders(response.data)
                    calculatePageNumbers(response.data)
                })
                .catch(reason => console.log(reason))
        }

        fetchAllOrders()
    }, [index, page])

    useEffect(() => {
        function fetchAllOrdersStatuses() {
            axios.get("http://localhost:8080/admin/order-management/all-statuses")
                .then(response => setOrderStatuses(response.data))
                .catch(reason => console.log(reason))
        }

        fetchAllOrdersStatuses()
    }, []);


    function onSearchFormSubmit(event) {
        event.preventDefault()
        let searchBy = event.target?.querySelector("select")?.value
        let value = event.target?.querySelector("input")?.value
        if (searchBy === "id") {
            searchOrderById(value)
        } else {
            const params = {
                searchBy: searchBy,
                value: value,
                page: page
            }
            searchOrdersByParameter(params)
        }
    }

    function updateOrderStatusField(event, fieldName, orderId, index) {
        event.preventDefault()
        const url = "http://localhost:8080/admin/order-management/order-status"
        let orderStatus = event.target.querySelector("select")?.value;
        let span = document.getElementById("edit-span-" + fieldName + index)
        let form = document.getElementById("edit-form-" + fieldName + index);
        let data = {
            orderId: orderId,
            orderStatus: orderStatus
        }
        axios.put(url, data)
            .then(response => {
                span.innerText = orderStatus
                span.style.display = "flex"
                form.style.display = "none"
                setIsElementClicked(false)
            })
            .catch(reason => {
                setNotificationText(reason.response.data)
                setNotificationVisible(true)
                closeForm(form, span)
                console.log(reason)
            })
    }

    function searchOrderById(value) {
        const params = {
            orderId: value
        }
        axios.get("http://localhost:8080/admin/order-management/order", {params})
            .then(response => setOrders({content: new Array(response.data)}))
            .catch(reason => {
                console.log(reason)
                setNotificationText("ORDERS NOT FOUND.")
                setNotificationVisible()
            })
    }

    function searchOrdersByParameter(params) {
        axios.get("http://localhost:8080/admin/order-management/orders", {params})
            .then(response => setOrders(response.data))
            .catch(reason => {
                console.log(reason)
                setNotificationText("ORDERS NOT FOUND.")
                setNotificationVisible()
            })
    }

    function handleOrderClick() {
        document.getElementById("admin-order-details").style.display = "flex"
    }

    return (
        <>
        <OrderDetails />
        <div className={"menu-my-account"}>
            <h1>ORDERS LIST</h1>
            <form
                onSubmit={event => onSearchFormSubmit(event)}
                className={"admin-panel-search-form"}>
                {searchParam === "orderStatus" && (
                    <datalist key={index} id={"orderStatus"}>
                        {orderStatuses?.map((order, index) => (
                            <option key={index} value={order}>{order}</option>
                        ))}
                    </datalist>
                )}
                <input
                    list={"orderStatus"}
                    required={true}
                    type={"text"}
                />
                <select onChange={event => setSearchParam(event.target.value)}>
                    <option value={"id"}>ID</option>
                    <option value={"userId"}>USER ID</option>
                    <option value={"orderStatus"}>ORDER STATUS</option>
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
                    <tbody key={index}>
                    {orders?.content?.map((order, index) => (
                    <tr onClick={handleOrderClick}>
                        <td>{order?.id}</td>
                        <td className={"user-id"}>
                            <span id={"edit-span-name" + index}>{order?.userId}</span></td>
                        <td
                            className={"order-status"}
                            onClick={(event) =>
                                showElementEditor(index, "orderStatus", "form")}>
                            <form
                                onSubmit={event =>
                                    updateOrderStatusField(event, "orderStatus", order?.id, index)}
                                id={"edit-form-orderStatus" + index}
                                className={"edit-products-form"}>
                                <select id="orderStatus" name="orderStatus">
                                    {orderStatuses?.map((status, index) => (
                                        <option key={index} value={status}>{status}</option>))}
                                </select>
                                <button type={"submit"}>OK</button>
                            </form>
                            <span id={"edit-span-orderStatus" + index}>{order?.orderStatus}</span></td>
                    </tr>
                    ))}
                    </tbody>
            </table>
            <Pagination
                productsPageable={orders}
                pagination={pagination}
                currentPage={page}
                setCurrentPage={setPage}
                currentSize={50}
            />
        </div>
            </>
    )
}

export default MenageOrders