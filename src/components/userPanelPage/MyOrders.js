import React, {useEffect, useState} from "react";
import axios from "axios";
import ActivationCodes from "./ActivationCodes";

function MyOrders() {
    const [orderProducts, setOrderProducts] = useState([])
    const [codesList, setCodesList] = useState([])

    useEffect(() => {
        function fetchOrderProducts() {
            axios.get("http://localhost:8080/order-product")
                .then(response => setOrderProducts(response.data))
                .catch(reason => console.log(reason))

        }

        fetchOrderProducts()
    }, []);


    function showOrderCode(codes) {
        alert(codes)
        setCodesList(codes)
        document.getElementsByClassName("activation-codes-container").item(0).style.display = "flex"
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
            <h1>MY ORDERS</h1>
            <div className={"user-panel-header"}>
                <h3>GAMES PURCHASED</h3>
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
                                <p>DATE ORDERED: {formatOrderDate(orderProduct?.order)}</p>
                                <p>ORDER STATUS: {orderProduct?.order.orderStatus}</p>
                                <p>PAYMENT METHOD: {orderProduct?.order.paymentMethod}</p>
                                <p>ORDER NUMBER: #{orderProduct?.order.id} (THIS IS NOT YOUR CODE)</p>
                                <p>PLATFORM: {orderProduct?.product.platformDto.name}</p>
                                <p>AGE RATING: {orderProduct?.product.ageRating}</p>
                                <p>QUANTITY: {orderProduct?.quantity}</p>
                                <p>PRODUCT SUMMARY PRICE: {calculateProductSummaryPrice(orderProduct).toFixed(2)}</p>
                                <p className={"order-price"}>ORDER SUMMARY PRICE {orderProduct?.order.totalPrice.toFixed(2)} PLN</p>
                            </div>
                            <div className={"order-actions-container"}>
                                <button
                                    onClick={() => showOrderCode(orderProduct?.activationCodes)}
                                    className={"show-order-code-button"}
                                >
                                    GET CODE
                                </button>
                            </div>
                        </div>
                </div>
            ))}
        </div>
    );
}

export default MyOrders;