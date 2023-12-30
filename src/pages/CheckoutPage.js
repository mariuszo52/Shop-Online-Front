import React, {useEffect, useState} from "react";
import Menu from "../components/Menu";
import trash from "../images/trash.jpg";
import {useNavigate} from "react-router-dom";
import {useCart} from "../context/CartContext";
import axios from "axios";

function CheckoutPage() {
    let {cartItems} = useCart();
    let navigate = useNavigate();
    const [country, setCountry] = useState("")
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [city, setCity] = useState("")
    const [payment, setPayment] = useState("BLIK")
    const [totalPrice, setTotalPrice] = useState(0.0)


    let shippingAddress = {
        country: country,
        name: name,
        lastName: lastName,
        address: address,
        phoneNumber: phoneNumber,
        postalCode: postalCode,
        city: city
    }
    useEffect(() => {
        function calculateTotalPrice(){
            let totalPrice = 0;
            cartItems.forEach(cartItem => {
                totalPrice += cartItem?.price * cartItem?.cartQuantity
            })
            setTotalPrice(totalPrice)
        }
        calculateTotalPrice()
    }, [cartItems]);

    function setBillingAddressFormDisabled(){
        let billingForm = document.getElementsByClassName("billing-address-form").item(0);
        billingForm.style.opacity = 0.5
        billingForm.querySelectorAll("*").forEach(element =>{
            element.style.pointerEvents = "none";
        })
    }

    function setPaymentFormEnabled() {
        let paymentForm = document.getElementsByClassName("payment-method-form").item(0);
        paymentForm.style.opacity = 1;
        for (const paymentFormElement of paymentForm.querySelectorAll('*')) {
            paymentFormElement.style.pointerEvents = "auto";
        }
    }

    useEffect(() => {
        function fetchUserAccountInfo() {
            axios.get("http://localhost:8080/user")
                .then(response => {
                    setCountry(response.data?.country)
                    setName(response.data?.name)
                    setLastName(response.data?.lastName)
                    setAddress(response.data?.address)
                    setPhoneNumber(response.data?.phoneNumber)
                    setPostalCode(response.data?.postalCode)
                    setCity(response.data?.city)
                })
                .catch(reason => console.log(reason))
        }

        fetchUserAccountInfo()
    }, []);

    function onsubmitBillingAddress(event) {
        event.preventDefault();
        setBillingAddressFormDisabled()
        setPaymentFormEnabled()
    }

    function onSubmitPaymentMethod(event) {
        event.preventDefault()
        const data = {
            shippingAddress: shippingAddress,
            paymentMethod: payment,
            productList: cartItems
        }
        axios.post("http://localhost:8080/order/checkout", data)
            .then(response => console.log(response.data))
            .catch(reason => console.log(reason))
    }

    function onTermsClick() {
        window.open("http://localhost:3000/terms-and-conditions", "_blank")
    }

    function onPrivacyPolicyClick() {
        window.open("http://localhost:3000/privacy-policy", "_blank")
    }

    return (
        <div className={"main-div"}>
            <Menu/>
            <h1 className={"checkout-h1"}>CHECKOUT</h1>
            <form className={"billing-address-form"} onSubmit={event => onsubmitBillingAddress(event)}>
                <div className={"form-h2"}>
                    <h2>BILLING ADDRESS</h2>
                </div>
                <label>COUNTRY*</label>
                <input defaultValue={shippingAddress?.country}
                       onChange={event => setCountry(event.target.value)} required={true}/>
                <label>FIRST NAME*</label>
                <input defaultValue={shippingAddress?.name}
                       onChange={event => setName(event.target.value)} required={true}/>
                <label>LAST NAME*</label>
                <input defaultValue={shippingAddress?.lastName}
                       onChange={event => setLastName(event.target.value)} required={true}/>
                <label>STREET ADDRESS*</label>
                <input defaultValue={shippingAddress?.address}
                       onChange={event => setAddress(event.target.value)}
                       required={true}/>
                <label>CITY*</label>
                <input defaultValue={shippingAddress?.city}
                       onChange={event => setCity(event.target.value)} required={true}/>
                <label>POSTAL CODE*</label>
                <input defaultValue={shippingAddress?.postalCode}
                       minLength={5}
                       maxLength={5}
                       onChange={event => setPostalCode(event.target.value)} type={"text"} required={true}/>
                <label>PHONE NUMBER*</label>
                <input defaultValue={shippingAddress?.phoneNumber}
                       onChange={event => setPhoneNumber(event.target.value)}
                       type={"tel"} required={true}/>
                <button className={"submit-button"} type={"submit"}>CONFIRM ADDRESS</button>
            </form>
            <form className={"payment-method-form"}
                  onSubmit={event => onSubmitPaymentMethod(event)}>
                <div className={"form-h2"}>
                    <h2>PAYMENT METHOD</h2>
                </div>
                <label>
                    <input
                        type={"radio"}
                        value={"BLIK"}
                        onChange={event => setPayment(event.target.value)}
                        name={"payment"}
                        checked={payment === 'BLIK'}
                    />
                    BLIK
                </label>
                <label>
                    <input
                        type={"radio"}
                        value={"TRANSFER"}
                        onChange={event => setPayment(event.target.value)}
                        name={"payment"}
                        checked={payment === 'TRANSFER'}
                    />
                    TRANSFER
                </label>

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
                            <p>{item.cartQuantity}</p>
                        </div>
                        <div className={"subtotal-column"}>
                            <p className={"product-price"}>{((item?.price) * (item?.cartQuantity))?.toFixed(2)} PLN</p>
                        </div>
                    </div>))}
                <h2>TOTAL: {totalPrice?.toFixed(2)} PLN</h2>

                <label><input required={true} type={"checkbox"}/> I agree to
                    the
                    <span className={"span-link"} onClick={onTermsClick}> Terms & Conditions</span> and
                    <span className={"span-link"} onClick={onPrivacyPolicyClick}> Privacy Policy</span></label>
                <button type={"submit"} className={"submit-button"}>ORDER</button>
            </form>

        </div>
    )
}

export default CheckoutPage;