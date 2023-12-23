import React, {useState} from "react";
import Menu from "../components/Menu";
import trash from "../images/trash.jpg";
import {useNavigate} from "react-router-dom";

function CheckoutPage(){
    const [cartItems, setCartItems] = useState(JSON.parse(sessionStorage.getItem("cart")))
    let navigate = useNavigate();

    function onsubmitBillingAddress() {

    }

    function onSubmitPaymentMethod() {

    }

    return(
        <div className={"main-div"}>
            <Menu />
            <h1 className={"checkout-h1"}>CHECKOUT</h1>
            <form className={"billing-address-form"} onSubmit={onsubmitBillingAddress}>
                <div className={"form-h2"}>
                    <h2>BILLING ADDRESS</h2>
                </div>
                <label>COUNTRY*</label>
                <input required={true}/>
                <label>FIRST NAME*</label>
                <input required={true}/>
                <label>LAST NAME*</label>
                <input required={true}/>
                <label>STREET ADDRESS*</label>
                <input required={true}/>
                <label>CITY*</label>
                <input required={true}/>
                <label>POSTAL CODE*</label>
                <input type={"number"} required={true}/>
                <label>PHONE NUMBER*</label>
                <input type={"number"} required={true}/>
                <button className={"submit-button"} type={"submit"}>CONFIRM ADDRESS</button>
            </form>
            <form className={"payment-method-form"} onSubmit={onSubmitPaymentMethod}>
                <div className={"form-h2"}>
                    <h2>PAYMENT METHOD</h2>
                </div>
                <label><input type={"radio"} name={"payment"} checked={true}/> BLIK</label>
                <label><input type={"radio"} name={"payment"}/> TRANSFER</label>
                <div className={"order-summary-h2"}>
                    <h2>ORDER SUMMARY</h2>
                </div>
                        {cartItems?.map((item, index) => (
                            <div key={index} className={"cart-product"}>
                                <div className={"product-column"}>
                                    <img className={"product-cover"} alt={"product"} src={item?.coverImage}/>
                                    <div className={"product-info"}>
                                        <p onClick={() => navigate("/product/" + item.id)}
                                           className={"title"}>{item?.name}</p>
                                        <p className={"product-more-details"}>{item?.platformDto.name}</p>
                                        <p className={"product-more-details"}>{item?.platformDto.device}</p>
                                    </div>

                                </div>
                                <div className={"quantity-column"}>
                                  <p>{item.quantity}</p>
                                </div>
                                <div className={"subtotal-column"}>
                                    <p className={"product-price"}>{((item?.price) * (item?.cartQuantity))?.toFixed(2)} PLN</p>
                                </div>
                            </div>))}
            </form>

        </div>
    )
}
export default CheckoutPage;