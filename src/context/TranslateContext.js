import React, {createContext, useContext} from "react";
import i18n from "../components/i18n";
import axios from "axios";
import {useTranslation} from "react-i18next";
const TranslateContext = createContext();

export function TranslateProvider({children}) {
    const {i18n} = useTranslation()
    function translate(text) {
        return new Promise((resolve, reject) => {
            if (i18n.language !== "en") {
                axios.get("http://localhost:8080/translate", {
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

    return (
        <TranslateContext.Provider
            value={{
            translate
            }}
        >
            {children}
        </TranslateContext.Provider>
    );
}

export function useTranslate() {
    return useContext(TranslateContext);
}
