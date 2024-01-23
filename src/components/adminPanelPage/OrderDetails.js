import React from "react";
import axios from "axios";
import {useNotification} from "../../context/NotificationContext";
import {useTranslation} from "react-i18next";

function OrderDetails({orderProducts, closeForm, setIsElementClicked, showElementEditor}) {
    const {t} = useTranslation()
    const {setNotificationVisible, setNotificationText} = useNotification();

    function handleCloseButtonClick() {
        document.getElementById("admin-order-details").style.display = "none"
    }

    function updateOrderProductField(event, fieldName, orderProductId, index) {
        event.preventDefault()
        let url
        switch (fieldName) {
            case "quantity":
                url = "http://localhost:8080/admin/order-management/order-product-quantity"
                break
            case "code":
                url = "http://localhost:8080/admin/order-management/order-product-code"
                break
            default: console.log(t("illegalValue"));
        }
        let value = event.target.querySelector("input")?.value;
        let span = document.getElementById("edit-span-" + fieldName + index)
        let form = document.getElementById("edit-form-" + fieldName + index);
        let data = {
            orderProductId: orderProductId,
            [fieldName]: value
        }
        axios.put(url, data)
            .then(response => {
                span.innerText = value
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
                    <td>{t("name")}</td>
                    <td>{t("quantity")}</td>
                    <td>{t("code")}</td>
                </tr>
                </thead>
                <tbody>
                {orderProducts?.map((orderProduct, index) => (
                    <tr key={index}>
                        <td className={"order-product-id"}>{orderProduct?.id}</td>
                        <td className={"order-product-name"}>{orderProduct?.product.name}</td>
                        <td className={"order-product-quantity"}
                            onClick={(event) =>
                                showElementEditor(index, "quantity", "input")}>

                            <form
                                onSubmit={event =>
                                    updateOrderProductField(event, "quantity",
                                        orderProduct?.id, index)}
                                id={"edit-form-quantity" + index}
                                className={"edit-quantity-form"}>
                                <input
                                    type={"number"}
                                    required={true}
                                />

                            </form>
                            <span id={"edit-span-quantity" + index}>{orderProduct?.quantity}</span></td>
                        <td className={"order-product-code"}
                            onClick={(event) =>
                                showElementEditor(index, "code", "input")}>
                            <form
                                onSubmit={event =>
                                    updateOrderProductField(event, "code",
                                        orderProduct?.id, index)}
                                id={"edit-form-code" + index}
                                className={"edit-code-form"}>
                                <input
                                    required={true}
                                />
                            </form>
                            <span id={"edit-span-code" + index}>
                                {orderProduct?.activationCodes.length !== 0 ?
                                    orderProduct.activationCodes.join("|") : t("setCode")}
                            </span></td>
                    </tr>
                ))}
                </tbody>

            </table>
        </div>
    )
}

export default OrderDetails