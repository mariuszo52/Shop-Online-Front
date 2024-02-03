import React, {createContext, useContext, useEffect, useState} from "react";
import {useNotification} from "./NotificationContext";
import axios from "axios";
import {useTranslation} from "react-i18next";
import i18n from "../components/i18n";
const CartContext = createContext();

export function CartProvider({children}) {
    const [index, setIndex] = useState(0)
    const [isCartVisible, setIsCartVisible] = useState(false);
    const {setNotificationVisible, setNotificationText} = useNotification();
    const [cartItems, setCartItems] = useState()
    const [cartTotalElements, setCartTotalElements] = useState()
    const {t} = useTranslation()
    function saveCartToDatabase() {
        let cart = JSON.parse(sessionStorage.getItem("cart"));
        if (sessionStorage.getItem("jwt") && cart) {
            axios.put(process.env.REACT_APP_SERVER_URL + "/cart", cart)
                .then(response => console.log(response.data))
                .catch(reason => console.log(reason))
        }
    }
    function translate(text) {
        return new Promise((resolve, reject) => {
            if (i18n.language !== "en") {
                axios.get(process.env.REACT_APP_SERVER_URL + "/translate", {
                    params: {"langCode": i18n.language, "text": text}
                })
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(reason => {
                        console.error(reason);
                        reject("Translation failed");
                    });
            } else {
                resolve(text);
            }
        });
    }


    function fetchCart() {
        if (sessionStorage.getItem("jwt")) {
            axios.get(process.env.REACT_APP_SERVER_URL + "/cart")
                .then(response => {
                    setCartItems(response.data)
                    let totalElements = 0;
                    for (const element of response.data) {
                        totalElements += element.cartQuantity
                    }
                    setCartTotalElements(totalElements)
                })
                .catch(reason => console.log(reason))

        } else {
            setCartItems(JSON.parse(sessionStorage.getItem("cart")) || [])
            setCartTotalElements(JSON.parse(sessionStorage.getItem("cartTotalElements")) || 0)
        }
    }

    const updateCartAndTotalElements = (cart) => {
        let totalElements = 0;
        for (const cartElement of cart) {
            totalElements += parseInt(cartElement.cartQuantity);
        }
        sessionStorage.setItem("cartTotalElements", totalElements.toString());
        sessionStorage.setItem("cart", JSON.stringify(cart));
        console.log(sessionStorage.getItem("cart"))
    };

    const addToCart = (product) => {
        setIsCartVisible(true);
        let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
        if (!cart.some((cartElement) => cartElement.id === product.id)) {
            product.cartQuantity = 1;
            if (!sessionStorage.getItem("jwt")) {
                cart.push(product);
                updateCartAndTotalElements(cart);
            } else {
                axios.post(process.env.REACT_APP_SERVER_URL + "/cart", product)
                    .then(response => {
                        console.log(response.data)
                        setIndex((prevState) => prevState + 1);
                    })
                    .catch(err => {
                        translate(err.response.data)
                            .then(translation => {
                                setNotificationText(translation)
                                setNotificationVisible(true)
                            })
                            .catch(translationErr => console.log(translationErr))
                        console.log(err)
                    })
            }

        } else {
            setNotificationVisible();
            setNotificationText(t("prodInCart"))
        }
        setIndex((prevState) => prevState + 1);

    };

    const onQuantityChange = (event, product) => {
        if(sessionStorage.getItem("jwt")){
            product.cartQuantity = event.target.value;
            for (const cartInput of document.getElementsByClassName("cart-input")) {
                cartInput.disabled = false
            }
                axios.patch(process.env.REACT_APP_SERVER_URL + "/cart/quantity", product)
                    .then(response => {
                        for (const cartInput of document.getElementsByClassName("cart-input")) {
                            cartInput.disabled = false
                        }
                        console.log(response.data)
                        setIndex((prevState) => prevState + 1);
                    })
                    .catch(reason => console.log(reason))

        }else {
            if (event.target.value !== "") {
                setIndex((prevState) => prevState + 1);
                let cart = JSON.parse(sessionStorage.getItem("cart") || []);
                for (const cartElement of cart) {
                    if (cartElement.id === product.id) {
                        cartElement.cartQuantity = event.target.value;
                    }
                }
                updateCartAndTotalElements(cart);
            }
        }

        }

    const removeProductFromCart = (product) => {
        if(sessionStorage.getItem("jwt")){
            axios.delete(process.env.REACT_APP_SERVER_URL + "/cart/".concat(product.id))
                .then(() => setIndex((prevState) => prevState + 1))
                .catch(reason => console.log(reason))
            } else {
            setIndex((prevState) => prevState + 1);
            let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
            for (let i = 0; i < cart?.length; i++) {
                if (cart[i]?.id === product.id) {
                    cart.splice(i, 1)
                }
                updateCartAndTotalElements(cart)
            }
        }
    }

    function clearCart() {
        if(sessionStorage.getItem("jwt")){
            axios.delete(process.env.REACT_APP_SERVER_URL + "/cart")
                .then(response => {
                    console.log(response)
                    setIndex((prevState) => prevState + 1);
                })
                .catch(reason => console.log(reason))
        }else{
            setIndex((prevState) => prevState + 1);
            sessionStorage.setItem("cart", JSON.stringify([]));
            let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
            updateCartAndTotalElements(cart)
        }
    }
    function onCheckoutClick(){
        let cart = sessionStorage.getItem("cart");
        if(sessionStorage.getItem("jwt") && (!cartItems || cartItems?.length === 0)){
            setNotificationText(t("emptyCart"))
            setNotificationVisible()
        }
        if(!sessionStorage.getItem("jwt") && (!cart && JSON.parse(cart)?.length === 0 )){
            setNotificationText(t("emptyCart"))
            setNotificationVisible()
        }
        else if(sessionStorage.getItem("jwt") && cartItems?.length !== 0){
            window.location.href = "/checkout"
        }else if (!sessionStorage.getItem("jwt")) {
            window.location.href = "/account/login"
        }
    }

    return (
        <CartContext.Provider
            value={{
                onCheckoutClick,
                fetchCart,
                cartItems,
                cartTotalElements,
                setIsCartVisible,
                index,
                setIndex,
                addToCart,
                isCartVisible,
                onQuantityChange,
                clearCart,
                removeProductFromCart,
                saveCartToDatabase
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
