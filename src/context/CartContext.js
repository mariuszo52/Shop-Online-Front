// CartContext.js

import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [index, setIndex] = useState(0)
    const [isCartVisible, setIsCartVisible] = useState(false);

    const addToCart = (product) => {
        setIndex(prevState => prevState + 1)
        setIsCartVisible(true)
        let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
        const updatedCart = [...cart, product];
        sessionStorage.setItem("cart", JSON.stringify(updatedCart))
    };


    return (
        <CartContext.Provider
            value={{
                setIsCartVisible,
                index,
                addToCart,
                isCartVisible,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
