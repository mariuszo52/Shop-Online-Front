import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faHeart} from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from "react-router-dom";
import { useCookies } from "react-cookie";
import React, {useEffect, useState} from "react";
import CartPreview from "./CartPreview";

function ProductListElement({products,isCartPreviewVisible, setIsCartPreviewVisible}) {
    const [cookies, setCookies] = useCookies(["cart"])
    let navigate = useNavigate();
    const [updatedCart, setUpdatedCart] = useState(cookies.cart)

    function handleMouseOut(index) {
        let span = document.getElementsByClassName("add-to-cart");
        let favButton = document.getElementsByClassName("add-to-fav");
        favButton[index].style.display = "none";
        span[index].style.display = "none";
    }

    function handleMouseOver(index) {
        let span = document.getElementsByClassName("add-to-cart");
        let favButton = document.getElementsByClassName("add-to-fav");
        favButton[index].style.display = "flex";
        span[index].style.display = "flex";
    }

    function handleFavIconClick(index) {
        let favIcon = document.getElementsByClassName("add-to-fav")[index];
        let computedStyle = window.getComputedStyle(favIcon);
        let color = computedStyle.getPropertyValue("color");
        if (color === "rgb(0, 128, 0)") {
            favIcon.style.scale = "3.5";
            favIcon.style.color = "red";
        } else {
            favIcon.style.scale = "3.0";
            favIcon.style.color = "green";
        }
    }

    function addToCart(product) {
        setIsCartPreviewVisible(true)
        const cart = cookies.cart || [];
        const updatedCart = [...cart, product];
        setUpdatedCart(updatedCart)
    }


    return (
        <>
            <CartPreview
                setIsCartPreviewVisible={setIsCartPreviewVisible}
                isCartPreviewVisible={isCartPreviewVisible}
                updatedCart = {updatedCart}
            />
            {products.map((product, index) => (
                <div
                    key={index}
                    onMouseOver={() => handleMouseOver(index)}
                    onMouseOut={() => handleMouseOut(index)}
                    className={"products-list-el"}
                >
        <span onClick={() => addToCart(product)} className={"add-to-cart"}>
          TO CART
        </span>
                    <FontAwesomeIcon
                        onClick={() => handleFavIconClick(index)}
                        className={"add-to-fav"}
                        icon={faHeart}
                    />
                    <img
                        key={index}
                        onClick={() => navigate("/product/" + product.id)}
                        src={product?.coverImage}
                        alt={product?.name}
                    />
                    <div className={"product-main-info"}>
                        <p id={"product-name"}>{product.name}</p>
                        <p id={"product-price"}>{product.price} PLN</p>
                    </div>
                </div>
            ))}
        </>
    );



}

export default ProductListElement;
