import Menu from "../components/Menu";
import React, {useEffect, useState} from "react";
import trash from "../images/trash.jpg"
import {useCart} from "../context/CartContext";

function CartPage() {
    const {index, onQuantityChange, removeProductFromCart} = useCart();
    const [cartItems, setCartItems] = useState()
    const [cartTotalElements, setCartTotalElements] = useState()

    useEffect(() => {
        setCartItems(JSON.parse(sessionStorage.getItem("cart")) || [])
        setCartTotalElements(JSON.parse(sessionStorage.getItem("cartTotalElements")) || 0)
    }, [index]);

    return (
        <div className={"main-div"}>
            <Menu/>
            <h1 className={"my-cart-h1"}>MY CART</h1>
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
            <div className={"cart-products-container"}>
                {cartItems?.map((item, index) => (
                    <div key={index} className={"cart-product"}>
            <div className={"product-column"}>
                <img className={"product-cover"} alt={"product"} src={item?.coverImage}/>
                <div className={"product-info"}>
                    <p className={"title"}>{item?.name}</p>
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
                    <p>{((item?.price) * (item?.cartQuantity))?.toFixed(2)} PLN</p>
                    </div>
                    <div className={"remove-column"}>
                        <img onClick={() => removeProductFromCart(item)} className={"trash-image"} alt={"trash"} src={trash}/>
                    </div>
                </div>
                    ))}
            </div>

        </div>
    );
}

export default CartPage;
