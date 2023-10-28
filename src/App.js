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
        </Routes>
            </CartProvider>
      </BrowserRouter>
        </NotificationProvider>
  );

}

export default App;
