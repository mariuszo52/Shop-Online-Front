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
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./pages/PrivacyPolicy/TermsAndConditions";
import {CookiesProvider} from "react-cookie";
import {CookiesPolicyProvider} from "./context/CookiesPolicyContext";
import CookiesPolicyBar from "./components/CookiesPolicyBar";
import AdminPanelPage from "./pages/AdminPanelPage";
import {AdminRoute} from "./routes/AdminRoute";

function App() {
    const [googleClientId, setGoogleClientId] = useState("")

    useEffect(() => {
        function fetchGoogleClientId() {
            axios.get("http://localhost:8080/login/google/client-id")
                .then(response => setGoogleClientId(response.data))
                .catch(reason => console.log(reason))
        }

        fetchGoogleClientId();
    }, []);

    return (
        <GoogleOAuthProvider
            clientId={googleClientId}>
            <CookiesPolicyProvider>
                <CookiesPolicyBar/>
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
                                <Route path={"/account/login"}
                                       element={<LoggedRoute><LoginPage/></LoggedRoute>}></Route>
                                <Route path={"/account/register"}
                                       element={<LoggedRoute><RegisterPage/></LoggedRoute>}></Route>
                                <Route path={"/account/user-panel"}
                                       element={<UserRoute><UserPanelPage/></UserRoute>}></Route>
                                <Route path={"/checkout"} element={<UserRoute><CheckoutPage/></UserRoute>}></Route>
                                <Route path={"/privacy-policy"} element={<PrivacyPolicy/>}></Route>
                                <Route path={"/terms-and-conditions"} element={<TermsAndConditions/>}></Route>
                                <Route path={"/account/admin-panel"}
                                       element={<AdminRoute><AdminPanelPage/></AdminRoute>}></Route>
                            </Routes>
                        </CartProvider>
                    </BrowserRouter>
                </NotificationProvider>
            </CookiesPolicyProvider>
        </GoogleOAuthProvider>
    );

}

export default App;
