import React, {useEffect, useState} from "react";
import axios from "axios";
import ActivationCodes from "./ActivationCodes";
import {useTranslation} from "react-i18next";

function MyOrders() {
    const [orderProducts, setOrderProducts] = useState([])
    const [codesList, setCodesList] = useState([])
    const {t} = useTranslation()

    useEffect(() => {
        function fetchOrderProducts() {
            axios.get(process.env.REACT_APP_SERVER_URL + "/order-product")
                .then(response => setOrderProducts(response.data))
                .catch(reason => console.log(reason))

        }

        fetchOrderProducts()
    }, []);


    function showOrderCode(codes) {
        setCodesList(codes)
        let codesContainer = document
            .getElementsByClassName("activation-codes-container");
        codesContainer.item(0).style.display = "flex"
        let scrollHeight = codesContainer.item(0)?.scrollHeight;
        window.scrollTo(0, scrollHeight)
    }

    function formatOrderDate(order) {
        const dateToShow = order?.orderDate.slice(0, 3).join('-');
        const timeToShow = order?.orderDate.slice(3, -1).join(':');
        return `${dateToShow} ${timeToShow}`;
    }


    function calculateProductSummaryPrice(orderProduct) {
        return orderProduct?.quantity * orderProduct?.product.price

    }

    return (
        <div className={"menu-my-account"}>
            <ActivationCodes
                codesList = {codesList}
            />
            <h1>{t("myOrders")}</h1>
            <div className={"user-panel-header"}>
                <h3>{t("gamesPurchased")}</h3>
            </div>
            {orderProducts?.map((orderProduct, index) => (
                <div className={"purchased-games-list"} key={index}>
                        <div className={"purchased-games-el"}>
                            <div key={index} className={"order-cover-container"}>
                                <img
                                    alt={"cover"}
                                    className={"order-cover"}
                                    src={orderProduct?.product.coverImage}
                                />
                            </div>
                            <div className={"order-info-container"}>
                                <p className={"order-title"}>{orderProduct?.product.name} </p>
                                <p>{t("dateOrdered")}: {formatOrderDate(orderProduct?.order)}</p>
                                <p>{t("orderStatus")}: {orderProduct?.order.orderStatus}</p>
                                <p>{t("paymentMethod")}: {orderProduct?.order.paymentMethod}</p>
                                <p>{t("orderNumber")}: #{orderProduct?.order.id} ({t("notYourCode")})</p>
                                <p>{t("platform")}: {orderProduct?.product.platformDto.name}</p>
                                <p>{t("quantity")}: {orderProduct?.quantity}</p>
                                <p>{t("productSummary")}: {calculateProductSummaryPrice(orderProduct).toFixed(2)}</p>
                                <p className={"order-price"}>{t("orderSummary")} {orderProduct?.order.totalPrice.toFixed(2)} PLN</p>
                            </div>
                            <div className={"order-actions-container"}>
                                <button
                                    onClick={() => showOrderCode(orderProduct?.activationCodes)}
                                    className={"show-order-code-button"}
                                >
                                    {t("getCode")}
        
                                </button>
                            </div>
                        </div>
                </div>
            ))}
        </div>
    );
}

export default MyOrders;