import Menu from "../components/Menu";
import React, {useEffect, useState} from "react";
import trash from "../images/trash.jpg"
import {useCart} from "../context/CartContext";
import {useNavigate} from "react-router-dom";
import Footer from "../components/Footer";
import SocialMedia from "../components/SocialMedia";


function CartPage() {
    const navigate = useNavigate();
    const {index, onQuantityChange, removeProductFromCart, fetchCart,
    cartTotalElements, cartItems} = useCart();
    const [cartTotalPrice, setCartTotalPrice] = useState(0);

    useEffect(() => {
        fetchCart();
    }, [index]);

    useEffect(() => {
        function calculateTotalPrice() {
            let totalPrice = 0;
            let cartItemsPricesParagraphs = document.getElementsByClassName("product-price");
            for (const cartItemsPricesParagraph of cartItemsPricesParagraphs) {
                let pricePln = cartItemsPricesParagraph.innerText;
                let price = parseFloat(pricePln.substring(0, pricePln.length - 4));
                totalPrice += price
            }
            sessionStorage.setItem("cartTotalPrice", JSON.stringify(totalPrice))
            setCartTotalPrice(totalPrice)
        }

        calculateTotalPrice();
    }, [index, cartItems]);

    return (
        <div className={"main-div"}>
            <Menu/>
            <div className={"cart-h1"}>
                <h1 className={"my-cart-h1"}>MY CART</h1>
                <span>{cartTotalElements} ITEMS</span>
            </div>
            <div className={"full-cart-header"}>
                <div className={"product-column"}>
                    <p id={"product"}>PRODUCT</p>

                </div>
                <div className={"quantity-column"}>
                    <p>QUANTITY</p>
                </div>
                <div className={"subtotal-column"}>
                    <p>SUBTOTAL</p>
                </div>
                <div className={"remove-column"}>
                </div>
            </div>
            {cartItems?.length !== 0 && (
                <div className={"cart-products-container"}>
                    {cartItems?.map((item, index) => (
                        <div key={index} className={"cart-product"}>
                            <div className={"product-column"}>
                                <img className={"product-cover"} alt={"product"} src={item?.coverImage}/>
                                <div className={"product-info"}>
                                    <p onClick={() => navigate("/product/" + item.id)} className={"title"}>{item?.name}</p>
                                    <p className={"product-more-details"}>{item?.platformDto.name}</p>
                                    <p className={"product-more-details"}>{item?.platformDto.device}</p>
                                </div>

                            </div>
                            <div className={"quantity-column"}>
                                <input id={"full-cart-quantity-input"} type={"number"}
                                       min={1}
                                       max={5}
                                       onChange={event => onQuantityChange(event, item)}
                                       defaultValue={item?.cartQuantity}
                                       className={"cart-input"}/>
                            </div>
                            <div className={"subtotal-column"}>
                                <p className={"product-price"}>{((item?.price) * (item?.cartQuantity))?.toFixed(2)} PLN</p>
                            </div>
                            <div className={"remove-column"}>
                                <img onClick={() => removeProductFromCart(item)} className={"trash-image"} alt={"trash"}
                                     src={trash}/>
                            </div>
                        </div>
                    ))}
                </div>)}
            {cartItems?.length === 0 && (
                <div id={"empty-cart-products-container"} className={"cart-products-container"}>
                    <p>You have no items in your shopping cart.</p>
                    <p>
                        Click <span onClick={() => navigate("/")}>here</span> to continue shopping.
                    </p>
                </div>

            )}
            <div className={"submit-cart-container"}>
                <div className={"checkout-container"}>
                <div className={"total-prize-div"}>
                    <p className={"total-prize-p"}>ORDER TOTAL</p>
                    <p className={"total-prize-p"}>{cartTotalPrice?.toFixed(2)} PLN</p>
                </div>
                </div>
                <div className={"checkout-button-container"}>
                    <p className={"checkout-button"}>CHECKOUT</p>
                </div>
            </div>
            <SocialMedia/>
            <Footer/>
        </div>
    );
}

export default CartPage;
