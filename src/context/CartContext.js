import React, {createContext, useContext, useEffect, useState} from "react";
import {type} from "@testing-library/user-event/dist/type";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [index, setIndex] = useState(0)
    const [isCartVisible, setIsCartVisible] = useState(false);


    const updateCartAndTotalElements = (cart) => {
        let totalElements = 0;
        for (const cartElement of cart) {
            totalElements += parseInt(cartElement.cartQuantity);
        }
        sessionStorage.setItem("cartTotalElements", totalElements.toString());
        sessionStorage.setItem("cart", JSON.stringify(cart));
    };

    const addToCart = (product) => {
        let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
        setIsCartVisible(true);
        setIndex((prevState) => prevState + 1);

        if (!cart.some((cartElement) => cartElement.id === product.id)) {
            product.cartQuantity = 1;
            cart.push(product);
            updateCartAndTotalElements(cart);
        }
    };

    const onQuantityChange = (event, product) => {
        setIndex((prevState) => prevState + 1);
        let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

        for (const cartElement of cart) {
            if (cartElement.id === product.id) {
                cartElement.cartQuantity = event.target.value;
            }
        }

        updateCartAndTotalElements(cart);
    };

    const removeProductFromCart = (product)=> {
        setIndex((prevState) => prevState + 1);
        let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
        for (let i = 0; i < cart?.length; i++) {
            if (cart[i]?.id === product.id) {
                cart.splice(i, 1)
            }
            updateCartAndTotalElements(cart)
        }
    }






    return (
        <CartContext.Provider
            value={{
                setIsCartVisible,
                index,
                addToCart,
                isCartVisible,
                onQuantityChange,
                removeProductFromCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
