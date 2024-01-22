import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import App from "./App";
import AxiosInterceptor from "./interceptors/AxiosInterceptor";
import "./components/i18n"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <AxiosInterceptor />
        <App />
    </>
);
