import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNotification} from "../../context/NotificationContext";
import {useDeleteConfirm} from "../../context/DeleteConfirmContext";
import Pagination from "../Pagination";
import OrderDetails from "./OrderDetails";
import {useTranslation} from "react-i18next";
import {useTranslate} from "../../context/TranslateContext";

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
    const [orderProducts, setOrderProducts] = useState([])
    const {t} = useTranslation()
    const {translate} = useTranslate();


    useEffect(() => {
        const params = {
            page: page
        }

        function fetchAllOrders() {
            axios.get(process.env.REACT_APP_SERVER_URL + "/admin/order-management/all-orders", {params})
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
            axios.get(process.env.REACT_APP_SERVER_URL + "/admin/order-management/all-statuses")
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
        const url = process.env.REACT_APP_SERVER_URL + "/admin/order-management/order-status"
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

    function searchOrderById(value) {
        const params = {
            orderId: value
        }
        axios.get(process.env.REACT_APP_SERVER_URL + "/admin/order-management/order", {params})
            .then(response => setOrders({content: new Array(response.data)}))
            .catch(reason => {
                console.log(reason)
                setNotificationText(t("ordersNotFound"))
                setNotificationVisible()
            })
    }

    function searchOrdersByParameter(params) {
        axios.get(process.env.REACT_APP_SERVER_URL + "/admin/order-management/orders", {params})
            .then(response => setOrders(response.data))
            .catch(reason => {
                console.log(reason)
                setNotificationText(t("ordersNotFound"))
                setNotificationVisible()
            })
    }

    function handleOrderClick(orderId) {
        fetchOrderDetails(orderId)
        document.getElementById("admin-order-details").style.display = "flex"
    }

    function fetchOrderDetails(orderId) {
        const params = {
            orderId: orderId
        }
        axios.get(process.env.REACT_APP_SERVER_URL + "/admin/order-management/order-products", {params})
            .then(response => setOrderProducts(response.data))
            .catch(reason => {
                setNotificationText(t("orderDetailsError"))
                setNotificationVisible(true)
                console.log(reason)
            })
    }

    return (
        <>
            <OrderDetails
                orderProducts={orderProducts}
                closeForm={closeForm}
                setIsElementClicked={setIsElementClicked}
                showElementEditor={showElementEditor}
            />
            <div className={"menu-my-account"}>
                <h1>{t("orderList")}</h1>
                <form
                    onSubmit={event => onSearchFormSubmit(event)}
                    className={"admin-panel-search-form"}>
                    {searchParam === "orderStatus" && (
                        <datalist id={"orderStatus"}>
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
                        <option value={"userId"}>{t("userId")}</option>
                        <option value={"orderStatus"}>{t("orderStatus")}</option>
                    </select>
                    <button type={"submit"}>{t("search")}</button>
                </form>
                <table className={"manage-orders-table"}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>{t("userId")}</th>
                        <th>{t("orderStatus")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders?.content?.map((order, index) => (
                        <tr key={index}>
                            <td onClick={() => handleOrderClick(order?.id)}>{order?.id}</td>
                            <td onClick={() => handleOrderClick(order?.id)} className={"user-id"}>
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