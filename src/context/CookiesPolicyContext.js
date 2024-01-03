import React, {createContext, useContext, useEffect, useState} from "react";
import {useCookies} from "react-cookie";

const CookiesPolicyContext = createContext();

export function CookiesPolicyProvider({ children }) {


    return (
        <CookiesPolicyContext.Provider
            value={{

            }}
        >
            {children}
        </CookiesPolicyContext.Provider>
    );
}

export function useCookiesPolicy() {
    return useContext(CookiesPolicyContext);
}
