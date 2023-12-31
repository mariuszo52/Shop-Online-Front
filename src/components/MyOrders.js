import React, {useEffect} from "react";
import cover from "../images/fifa20.jpg"
import axios from "axios";
function MyOrders() {
    useEffect(() => {
        function fetchUserOrders(){
            axios.get("http://localhost:8080/orders")
                .then(response => console.log(response.data))
                .catch(reason => console.log(reason))
        }
        fetchUserOrders()
    }, []);

    function showOrderCode() {
        //TODO
    }

    return (
        <div className={"menu-my-account"}>
            <h1>MY ORDERS</h1>
            <div className={"user-panel-header"}>
                <h3>GAMES PURCHASED</h3>
            </div>
            <div className={"purchased-games-el"}>
                <div className={"order-cover-container"}>
                <img alt={"cover"} className={"order-cover"} src={cover}/>
                </div>
                <div className={"order-info-container"}>
                    <p className={"order-title"}>FIFA 20 PSN </p>
                    <p>DATE ORDERED 24-10-2019 20:00</p>
                    <p>ORDER STATUS: DONE</p>
                    <p>PAYMENT METHOD: BLIK</p>
                    <p>ORDER NUMBER:  #0150324546 (THIS IS NOT YOUR CODE)</p>
                    <p>PLATFORM: PS4</p>
                    <p>REGION: POLAND</p>
                    <p>QUANTITY: 1</p>
                    <p className={"order-price"}>155.09</p>
                </div>
                <div className={"order-actions-container"}>
                    <button onClick={showOrderCode} className={"show-order-code-button"}>GET CODE</button>

                </div>
            </div>
            <div className={"purchased-games-el"}>
                <div className={"order-cover-container"}>
                    <img alt={"cover"} className={"order-cover"} src={cover}/>
                </div>
                <div className={"order-info-container"}>
                    <p className={"order-title"}>FIFA 20 PSN </p>
                    <p>DATE ORDERED 24-10-2019 20:00</p>
                    <p>PAYMENT METHOD: BLIK</p>
                    <p>ORDER NUMBER:  #0150324546 (THIS IS NOT YOUR CODE)</p>
                    <p>PLATFORM: PS4</p>
                    <p>REGION: POLAND</p>
                    <p>QUANTITY: 1</p>
                    <p className={"order-price"}>155.09</p>
                </div>
                <div className={"order-actions-container"}>
                <button onClick={showOrderCode} className={"show-order-code-button"}>GET CODE</button>
                </div>
            </div>

        </div>
    )
}

export default MyOrders;