import trash from "../images/trash.jpg"
import {useEffect, useState} from "react";
import {useCart} from "../context/CartContext";

function CartPreview() {
    const { isCartVisible, index, setIsCartVisible, onQuantityChange, removeProductFromCart} = useCart();

    const [cartItems, setCartItems] = useState([])
    const [cartTotalPrice, setCartTotalPrice] = useState(0);
    const [cartTotalElements, setCartTotalElements] = useState(0)

    useEffect(() => {
        setCartItems(JSON.parse(sessionStorage.getItem("cart")) || [])
        setCartTotalElements(JSON.parse(sessionStorage.getItem("cartTotalElements")) || 0)
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

    }

    return (
        isCartVisible && (
            <div className="cart-preview-container">
                <div className="cart-header">
                    <div className={"items-quantity"}>
                        <h3>MY CART</h3>
                        <h4>{cartTotalElements} ITEMS</h4>
                    </div>
                    <p className={"close-cart"} onClick={closeCartPreview}>x</p>
                </div>
                <div className={"cart-items"}>
                    {cartItems?.length === 0 &&(
                        <p>Cart is empty.</p>
                    )}
                    {cartItems?.map((item, index) => (
                        <div key={index} className={"cart-item"}>
                            <img src={item?.coverImage} alt={item?.name} className={"cart-product-image"}/>
                            <div className={"cart-product-info"}>
                                <div className={"title-container"}>
                                    <p className={"cart-product-title"}>{item?.name?.substring(0, 30)}</p>
                                </div>
                                <div className={"quantity-container"}>
                                    <span>QTY:  </span>
                                    <input type={"number"}
                                           min={1}
                                           max={99}
                                           onChange={event => onQuantityChange(event, item)}
                                           defaultValue={item?.cartQuantity}
                                           className={"cart-input"}/>
                                </div>

                            </div>
                            <div className={"cart-prize-container"}>
                                <img onClick={() => removeProductFromCart(item)} className={"trash-image"} alt={"trash"} src={trash}/>
                                <p className={"item-price"}>{((item?.price) * (item?.cartQuantity))?.toFixed(2)} PLN</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={"total-prize-container"}>
                    <p>SUBTOTAL</p>
                    <p>{cartTotalPrice?.toFixed(2)} PLN</p>
                </div>
                <div className={"summary-container"}>
                    <p onClick={refreshCart}>REFRESH CART</p>
                    <p>VIEW CART</p>
                    <p>CHECKOUT</p>
                </div>
            </div>
        )
    );
}

export default CartPreview;