import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart} from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useCart} from "../context/CartContext";
import axios from "axios";
import {useTranslation} from "react-i18next";
import Discount from "./Discount";

function ProductListElement({products, classname}) {
    const {addToCart} = useCart();
    const [favoriteProducts, setFavoriteProducts] = useState([])
    let navigate = useNavigate();
    const {t} = useTranslation()

    function fetchFavoriteProducts() {
        if (sessionStorage.getItem("jwt")) {
            axios.get(process.env.REACT_APP_SERVER_URL + "/favorite-product")
                .then(response => setFavoriteProducts(response.data))
                .catch(reason => console.log(reason))
        }
    }

    useEffect(() => {
        fetchFavoriteProducts()
    }, []);

    function handleMouseOut(productId) {
        if(window.innerWidth >= 1000) {
            let span = document.getElementById("add-to-cart-" + productId);
            let favButton = document.getElementById("fav-heart-" + productId)
            favButton.style.display = "none";
            span.style.display = "none";
        }
    }

    function handleMouseOver(productId) {
        if(window.innerWidth >= 1000) {
            let span = document.getElementById("add-to-cart-" + productId);
            let favButton = document.getElementById("fav-heart-" + productId)
            favButton.style.display = "flex";
            span.style.display = "flex";
        }
    }

    function handleFavIconClick(product) {
        if (sessionStorage.getItem("jwt")) {
            if (isProductInFavorites(product)) {
                deleteProductFromFavorite(product)
            } else {
                addProductToFavorite(product)
            }
        } else {
            navigate("/account/login")
        }
    }

    function addProductToFavorite(product) {
        axios.post(process.env.REACT_APP_SERVER_URL + "/favorite-product", product)
            .then(() => fetchFavoriteProducts())
            .catch(reason => console.log(reason))
    }

    function deleteProductFromFavorite(product) {
        const params = {
            productId: product?.id
        }
        axios.delete(process.env.REACT_APP_SERVER_URL + "/favorite-product", {params})
            .then(() => fetchFavoriteProducts())
            .catch(reason => console.log(reason))
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


    function isProductInFavorites(product) {
        let containProduct = false;
        favoriteProducts.forEach(fProduct => {
            if (fProduct?.id === product?.id) {
                containProduct = true;
            }
        })
        return containProduct;
    }

    return (
        <>
            {products?.map((product) => (
                <div
                    key={product?.id}
                    onMouseOver={() => handleMouseOver(product?.id)}
                    onMouseOut={() => handleMouseOut(product?.id)}
                    className={classname ? classname : "products-list-el"}
                >
                    <Discount
                        product={product}
                        classname={"product-el-discount-container"}
                    />
        <span onClick={() => addToCart(product)}
              className={"add-to-cart"}
              id={"add-to-cart-" + product?.id}>
              {t("toCart")}
        </span>
                    <FontAwesomeIcon
                        onClick={() => handleFavIconClick(product)}
                        className={isProductInFavorites(product) ? "fav-heart" : "no-fav-heart"}
                        id={"fav-heart-" + product.id}
                        icon={faHeart}/>
                    <img
                        key={product?.id}
                        onClick={() => navigate("/product/" + product.id)}
                        src={product?.coverImage}
                        alt={product?.name}
                    />
                    <div className={"product-main-info"}>
                        <p className={"product-name-p"} onMouseEnter={() => onMouseEnterProductName(product.id)}
                           id={"product-name-" + product.id}>{product.name}</p>
                        <p id={"product-price"}>{product.price} zł</p>
                    </div>
                </div>
            ))}
        </>
    );


}

export default ProductListElement;