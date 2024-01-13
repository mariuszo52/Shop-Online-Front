import React from "react";
import axios from "axios";
import {useNotification} from "../../context/NotificationContext";

function OrderDetails({orderProducts, closeForm, setIsElementClicked}) {
    //todo add codes list

    const {setNotificationVisible, setNotificationText} = useNotification();
    function handleCloseButtonClick() {
        document.getElementById("admin-order-details").style.display = "none"
    }

    function updateOrderProductField(event, fieldName, orderId, index) {
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

    return (
        <div id={"admin-order-details"}>
            <p onClick={handleCloseButtonClick} className={"close-fp-button"}>x</p>
            <table className={"order-products-table"}>
                <thead>
                <tr>
                    <td>ID</td>
                    <td>PRODUCT NAME</td>
                    <td>QUANTITY</td>
                    <td>CODE</td>
                </tr>
                </thead>
                <tbody>
                {orderProducts?.map((orderProduct, index) => (
                    <tr key={index}>
                        <td className={"order-product-id"}>{orderProduct?.id}</td>
                        <td className={"order-product-name"}>{orderProduct?.product.name}</td>
                        <td className={"order-product-quantity"}>
                            <form
                                onSubmit={event =>
                                    updateOrderProductField(event, "orderProductQuantity",
                                        orderProduct?.quantity, index)}
                                id={"edit-form-orderQuantity" + index}
                                className={"edit-quantity-form"}>
                                <input
                                    type={"number"}
                                    required={true}
                                />
                            </form>
                            <span id={"edit-span-orderCode" + index}>{orderProduct?.code}6</span></td>
                        <td className={"order-product-orderCode"}>
                            <form
                                onSubmit={event =>
                                    updateOrderProductField(event, "code",
                                        orderProduct?.code, index)}
                                id={"edit-form-code" + index}
                                className={"edit-code-form"}>
                                <input
                                    required={true}
                                />
                            </form>
                            <span id={"edit-span-orderCode" + index}>{orderProduct?.code}CODE</span></td>
                    </tr>
                ))}
                </tbody>

            </table>
        </div>
    )
}

export default OrderDetails