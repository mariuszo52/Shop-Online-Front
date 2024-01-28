import React, {useEffect, useState} from "react";
import axios from "axios";
import ProductListElement from "../ProductListElement";
import {useCart} from "../../context/CartContext";
import {useTranslation} from "react-i18next";

function Wishlist() {
    const [wishlist, setWishlist] = useState([])
    const {addToCart} = useCart();
    const {t} = useTranslation()
    useEffect(() => {
        function fetchFavoriteProducts() {
            axios.get(process.env.REACT_APP_SERVER_URL + "/favorite-product")
                .then(response => setWishlist(response.data))
                .catch(reason => console.log(reason))
        }

        fetchFavoriteProducts()
    }, []);

    function handleRemoveAllItems() {
        axios.delete(process.env.REACT_APP_SERVER_URL + "/favorite-product/all")
            .then(() => setWishlist([]))
            .catch(reason => console.log(reason))
    }

    function handleAddAllItemsToCart() {
        wishlist.forEach(product =>{
            addToCart(product)
        })
    }

    return (
        <div className={"menu-my-account"}>
            <h1>{t("wishlist")}</h1>
            <div className={"user-panel-header"}>
                <h3>{wishlist?.length} {t("items")}</h3>
            </div>
            <ul className={"wishlist"}>
                <ProductListElement
                    classname={"wishlist-el"}
                    products={wishlist}/>
            </ul>
            {wishlist?.length !== 0 ? (<div className={"wishlist-options"}>
                <p onClick={handleRemoveAllItems} className={"account-info-button"}>{t("removeAllItems")}</p>
                <p onClick={handleAddAllItemsToCart} className={"account-info-button"}>{t("addAllToCart")}</p>
            </div>) : (<div className={"wishlist-options"}></div>)}
        </div>
    )
}

export default Wishlist;