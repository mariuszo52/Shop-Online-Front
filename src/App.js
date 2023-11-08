import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home"
import PlatformPage from "./pages/PlatformPage";
import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ProductPage from "./pages/ProductPage";
import {CartProvider} from "./context/CartContext";
import CartPreview from "./components/CartPreview";
import {NotificationProvider} from "./context/NotificationContext";
import NotificationBar from "./components/NotificationBar";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
    return (
        <NotificationProvider>
            <NotificationBar/>
        <BrowserRouter>
            <CartProvider>
                <CartPreview/>
        <Routes>
          <Route path={"/"} element={<Home/>}></Route>
            <Route path={"/:deviceName"} element={<PlatformPage />}></Route>
            <Route path={"/product/:id"} element={<ProductPage/>}></Route>
            <Route path={"/cart"} element={<CartPage/>}></Route>
            <Route path={"/account/login"} element={<LoginPage/>}></Route>
            <Route path={"/account/register"} element={<RegisterPage />}></Route>
        </Routes>
            </CartProvider>
      </BrowserRouter>
        </NotificationProvider>
  );

}

export default App;
