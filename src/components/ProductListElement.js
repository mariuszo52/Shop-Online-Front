import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faHeart} from '@fortawesome/free-solid-svg-icons'
import {useNavigate, useParams} from "react-router-dom";
import { useCookies } from "react-cookie";
import React, {useEffect, useState} from "react";
import CartPreview from "./CartPreview";
import { useCart } from "../context/CartContext";

function ProductListElement({products}) {
    const { addToCart } = useCart();

    let navigate = useNavigate();
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


    function onMouseEnterProductName(productId) {
        let productNameParagraph = document.getElementById("product-name-" + productId);
        let intervalId;
            productNameParagraph.addEventListener('mouseenter', function () {
                intervalId = setInterval(function () {
                    productNameParagraph.scrollTop += 1
                }, 50); //
            });
            productNameParagraph.addEventListener('mouseleave', function () {
                productNameParagraph.scrollTop = 0;
                clearInterval(intervalId);
            });
        }





    return (
        <>
            {products?.map((product, index) => (
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
                        <p className={"product-name-p"} onMouseEnter={() => onMouseEnterProductName(product.id)}
                           id={"product-name-" + product.id}>{product.name}</p>
                        <p id={"product-price"}>{product.price} PLN</p>
                    </div>
                </div>
            ))}
        </>
    );



}

export default ProductListElement;