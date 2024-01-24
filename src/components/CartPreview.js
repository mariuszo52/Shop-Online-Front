import trash from "../images/trash.jpg"
import {useEffect, useState} from "react";
import {useCart} from "../context/CartContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function CartPreview() {
    const {
        isCartVisible, index, setIndex, clearCart,
        setIsCartVisible, onQuantityChange, removeProductFromCart,
        cartItems, cartTotalElements, fetchCart, onCheckoutClick
    } = useCart();
    const navigate = useNavigate();
    const [cartTotalPrice, setCartTotalPrice] = useState(0)
    const {t} = useTranslate()
    useEffect(() => {
       fetchCart();
    }, [index]);

    function closeCartPreview() {
        setIsCartVisible(false)
    }

    useEffect(() => {
        function calculateTotalPrice() {
            let totalPrice = 0;
            let cartItemsPricesParagraphs = document.getElementsByClassName("item-price");
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


    function refreshCart() {
        setIndex(index + 1)
    }


    function onViewCartClick() {
        setIsCartVisible(false)
        navigate("/cart")
    }

    return (
        isCartVisible && (
            <div className="cart-preview-container">
                <div className="cart-header">
                    <div className={"items-quantity"}>
                        <h3>{t("myCart")}</h3>
                        <h4>{cartTotalElements} {t("items")}</h4>
                    </div>
                    <p className={"close-cart"} onClick={closeCartPreview}>x</p>
                </div>
                <div className={"cart-items"}>
                    {cartItems?.length === 0 && (
                        <p>{t("cartEmpty")}</p>
                    )}
                    {cartItems?.map((item, index) => (
                        <div key={index} className={"cart-item"}>
                            <img src={item?.coverImage} alt={item?.name} className={"cart-product-image"}/>
                            <div className={"cart-product-info"}>
                                <div className={"title-container"}>
                                    <p onClick={() => navigate("/product/" + item.id)}
                                       className={"cart-product-title"}>{item?.name?.substring(0, 30)}</p>
                                </div>
                                <div className={"quantity-container"}>
                                    <span>{t("qty")}:  </span>
                                    <input type={"number"}
                                           min={1}
                                           max={5}
                                           onChange={event => onQuantityChange(event, item)}
                                           defaultValue={item?.cartQuantity}
                                           className={"cart-input"}/>
                                </div>

                            </div>
                            <div className={"cart-prize-container"}>
                                <img onClick={() => removeProductFromCart(item)} className={"trash-image"} alt={"trash"}
                                     src={trash}/>
                                <p className={"item-price"}>{((item?.price) * (item?.cartQuantity))?.toFixed(2)} PLN</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={"total-prize-container"}>
                    <p>{t("subtotal")}</p>
                    <p>{cartTotalPrice?.toFixed(2)} PLN</p>
                </div>
                <div className={"summary-container"}>
                    <p onClick={refreshCart}>{t("refreshCart")}</p>
                    <p onClick={clearCart}>{t("clearCart")}</p>
                    <p onClick={onViewCartClick}>{t("viewCart")}</p>
                    <p onClick={onCheckoutClick}>{t("checkout")}</p>
                </div>
            </div>
        )
    );
}

export default CartPreview;