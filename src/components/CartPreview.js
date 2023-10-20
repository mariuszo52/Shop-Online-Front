import trash from "../images/trash.jpg"
import {useEffect, useState} from "react";

function CartPreview({ isCartPreviewVisible, setIsCartPreviewVisible, index}) {
    const [cartItems, setCartItems] = useState(JSON.parse(sessionStorage.getItem("cart")))
    useEffect(() => {
        setCartItems(JSON.parse(sessionStorage.getItem("cart")))
    }, [index]);
    function closeCartPreview() {
        setIsCartPreviewVisible(false)
    }

    return (
        isCartPreviewVisible && (
            <div className="cart-preview-container">
                <div className="cart-header">
                    <div className={"items-quantity"}>
                    <h3>MY CART</h3>
                    <h4>{cartItems?.length} ITEMS</h4>
                </div>
                    <p className={"close-cart"} onClick={closeCartPreview}>X</p>
                </div>
                <div className={"cart-items"}>
                    {cartItems?.map((item, index) => (
                        <div key={index} className={"cart-item"}>
                    <img src={item?.coverImage} alt={item?.name} className={"cart-product-image"}/>
                    <div className={"cart-product-info"}>
                        <div className={"title-container"}>
                            <p className={"cart-product-title"}>{item?.name?.substring(0, 30)}</p>
                        </div>
                        <div className={"quantity-container"}>
                            <span>QTY:  </span>
                            <input defaultValue={1} type={"number"}
                                   className={"cart-input"}/>
                        </div>

                    </div>
                    <div className={"cart-prize-container"}>
                        <img className={"trash-image"} alt={"trash"} src={trash}/>
                        <p className={"item-prize"}>{item?.price} PLN</p>
                    </div>
                </div>
                        ))}
                </div>
                <div className={"total-prize-container"}>
                    <p>SUBTOTAL</p>
                    <p>5000 PLN</p>
                </div>
                <div className={"summary-container"}>
                    <p>VIEW CART</p>
                    <p>CHECKOUT</p>
                </div>
            </div>
        )
    );
}

export default CartPreview;
