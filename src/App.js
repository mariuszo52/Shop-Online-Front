import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home"
import PlatformPage from "./pages/PlatformPage";
import React, {useEffect, useState} from "react";
import ProductPage from "./pages/ProductPage";
import {CartProvider} from "./context/CartContext";
import CartPreview from "./components/CartPreview";
import {NotificationProvider} from "./context/NotificationContext";
import NotificationBar from "./components/NotificationBar";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import {LoggedRoute} from "./routes/LoggedRoute";
import {UserRoute} from "./routes/UserRoute";
import ErrorPage from "./pages/ErrorPage";
import {GoogleOAuthProvider} from "@react-oauth/google";
import UserPanelPage from "./pages/UserPanelPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
    const [googleClientId, setGoogleClientId] = useState("")
    useEffect(() => {
        function fetchGoogleClientId(){
            axios.get("http://localhost:8080/login/google/client-id")
                .then(response => setGoogleClientId(response.data))
                .catch(reason => console.log(reason))
        }
        fetchGoogleClientId();
    }, []);

    function saveCartToDatabase() {
        const data = JSON.parse(sessionStorage.getItem("cart"));
        axios.put("http://localhost:8080/cart", data)
            .then(response => console.log(response.data))
            .catch(reason => console.log(reason))
    }

    useEffect(() => {
        let cart = JSON.parse(sessionStorage.getItem("cart"));
        if (sessionStorage.getItem("jwt") && cart) {
            saveCartToDatabase();
        }
    }, []);
    return (
        <GoogleOAuthProvider
            clientId= {googleClientId}>
            <NotificationProvider>
                <NotificationBar/>
                <BrowserRouter>
                    <CartProvider>
                        <CartPreview/>
                        <Routes>
                            <Route path={"/"} element={<Home/>}></Route>
                            <Route path={"/error"} element={<ErrorPage/>}></Route>
                            <Route path={"/:deviceName"} element={<PlatformPage/>}></Route>
                            <Route path={"/product/:id"} element={<ProductPage/>}></Route>
                            <Route path={"/cart"} element={<CartPage/>}></Route>
                            <Route path={"/account/login"} element={<LoggedRoute><LoginPage/></LoggedRoute>}></Route>
                            <Route path={"/account/register"}
                                   element={<LoggedRoute><RegisterPage/></LoggedRoute>}></Route>
                            <Route path={"/account/user-panel"}
                                   element={<UserRoute><UserPanelPage/></UserRoute>}></Route>
                            <Route path={"/checkout"} element={<UserRoute><CheckoutPage /></UserRoute>}></Route>
                        </Routes>
                    </CartProvider>
                </BrowserRouter>
            </NotificationProvider>
        </GoogleOAuthProvider>
    );

}

export default App;
