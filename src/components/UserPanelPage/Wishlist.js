import React, {useEffect, useState} from "react";
import axios from "axios";
import ProductListElement from "../ProductListElement";
import {useCart} from "../../context/CartContext";

function Wishlist() {
    const [wishlist, setWishlist] = useState([])
    const {addToCart} = useCart();

    useEffect(() => {
        function fetchFavoriteProducts() {
            axios.get("http://localhost:8080/favorite-product")
                .then(response => setWishlist(response.data))
                .catch(reason => console.log(reason))
        }

        fetchFavoriteProducts()
    }, []);

    function handleRemoveAllItems() {
        axios.delete("http://localhost:8080/favorite-products-all")
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
            <h1>WISHLIST</h1>
            <div className={"user-panel-header"}>
                <h3>{wishlist?.length} ITEMS</h3>
            </div>
            <ul className={"wishlist"}>
                <ProductListElement
                    classname={"wishlist-el"}
                    products={wishlist}/>
            </ul>
            {wishlist?.length !== 0 ? (<div className={"wishlist-options"}>
                <p onClick={handleRemoveAllItems} className={"account-info-button"}>REMOVE ALL ITEMS</p>
                <p onClick={handleAddAllItemsToCart} className={"account-info-button"}>ADD ALL ITEMS TO CART</p>
            </div>) : (<div className={"wishlist-options"}></div>)}
        </div>
    )
}

export default Wishlist;