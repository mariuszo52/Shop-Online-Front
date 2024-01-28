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
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import {CookiesPolicyProvider} from "./context/CookiesPolicyContext";
import CookiesPolicyBar from "./components/CookiesPolicyBar";
import AdminPanelPage from "./pages/AdminPanelPage";
import {AdminRoute} from "./routes/AdminRoute";
import DeleteConfirmComponent from "./components/DeleteConfirmComponent";
import {DeleteConfirmProvider} from "./context/DeleteConfirmContext";
import {TranslateProvider} from "./context/TranslateContext";

function App() {
    const [googleClientId, setGoogleClientId] = useState("")

    useEffect(() => {
        function fetchGoogleClientId() {
            axios.get(process.env.REACT_APP_SERVER_URL + "/login/google/client-id")
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
                <TranslateProvider>
                <NotificationProvider>
                    <NotificationBar/>
                    <BrowserRouter>
                        <DeleteConfirmProvider>
                            <DeleteConfirmComponent/>
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
                                <Route path={"/privacy-policy"} element={<PrivacyPolicyPage/>}></Route>
                                <Route path={"/account/admin-panel"}
                                       element={<AdminRoute><AdminPanelPage/></AdminRoute>}></Route>
                            </Routes>
                        </CartProvider>
                        </DeleteConfirmProvider>
                    </BrowserRouter>
                </NotificationProvider>
                </TranslateProvider>
            </CookiesPolicyProvider>
        </GoogleOAuthProvider>
    );

}

export default App;
