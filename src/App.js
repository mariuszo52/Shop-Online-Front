import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home"
import PlatformPage from "./pages/PlatformPage";
import React, {useEffect} from "react";
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

function App() {
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("jwt");
    useEffect(() => {
        if(sessionStorage.getItem("jwt")){
            sessionStorage.removeItem("cartTotalElements")
            sessionStorage.removeItem("cart")
        }
    }, []);
    return (
        <GoogleOAuthProvider
            clientId="985874330130-mjutgkgsi961lgafhbkghnc4id8coa0r.apps.googleusercontent.com">
        <NotificationProvider>
            <NotificationBar/>
        <BrowserRouter>
            <CartProvider>
                <CartPreview/>
        <Routes>
          <Route path={"/"} element={<Home/>}></Route>
            <Route path={"/error"} element={<ErrorPage/>}></Route>
            <Route path={"/:deviceName"} element={<PlatformPage />}></Route>
            <Route path={"/product/:id"} element={<ProductPage/>}></Route>
            <Route path={"/cart"} element={<CartPage/>}></Route>
            <Route path={"/account/login"} element={<LoggedRoute><LoginPage/></LoggedRoute>}></Route>
            <Route path={"/account/register"} element={<LoggedRoute><RegisterPage /></LoggedRoute>}></Route>
            <Route path={"/account/my-account"} element={<UserRoute><UserPanelPage /></UserRoute>}></Route>
        </Routes>
            </CartProvider>
      </BrowserRouter>
        </NotificationProvider>
        </GoogleOAuthProvider>
  );

}

export default App;
