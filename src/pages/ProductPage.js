import Menu from "../components/Menu";
import SocialMedia from "../components/SocialMedia";
import Footer from "../components/Footer";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import ProductListElement from "../components/ProductListElement";
import {useCart} from "../context/CartContext";
import {useTranslation} from "react-i18next";
import i18n from "../components/i18n";


function ProductPage() {
    const {id} = useParams();
    const [product, setProduct] = useState(null)
    const navigate = useNavigate();
    const [languages, setLanguages] = useState([]);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [productActivation, setProductActivation] = useState([]);
    const {addToCart} = useCart();
    const {t} = useTranslation()
    const [description, setDescription] = useState("")


    function translate(description, activationDetails) {
        if (i18n.language !== "en") {
            axios.get("http://localhost:8080/translate", {
                params: {"langCode": i18n.language, "text": description}
            })
                .then(response => setDescription(response.data))
                .catch(reason => console.log(reason));
            axios.get("http://localhost:8080/translate", {
                params: {"langCode": i18n.language, "text": activationDetails}
            })
                .then(response => setProductActivation(response.data.split("\n")))
                .catch(reason => console.log(reason));
        }
    }

    useEffect(() => {
        function getProduct() {
            const params = {
                id: id
            }
            axios.get("http://localhost:8080/product", {params})
                .then(r => {
                    setProduct(r.data)
                    setProductActivation(r.data.activationDetails.split("\n"))
                    setDescription(r.data.description)
                    translate(r.data.description, r.data.activationDetails)

                })
                .catch(err => console.log("Cannot fetch product info." + err))
        }

        getProduct()
    }, [id, i18n.language]);

    useEffect(() => {
        function getSimilarProducts() {
            const params = {
                id: id
            }
            axios.get("http://localhost:8080/product/similar-products", {params})
                .then(r => setSimilarProducts(r.data))
                .catch(err => console.log("Cannot fetch product info." + err))
        }

        getSimilarProducts()
    }, [id]);

    useEffect(() => {
        function getLanguages() {
            const params = {
                id: id
            }
            axios.get("http://localhost:8080/language", {params})
                .then(r => setLanguages(r.data))
                .catch(err => console.log("Cannot fetch languages." + err))
        }

        getLanguages()
    }, [id]);

    const handleClickInfoMenuButton = (event) => {
        let moreInfoContentName = event.target.id?.toLowerCase();
        let moreInfoMenuElements = document.getElementsByClassName("more-info-el");
        for (let moreInfoMenuElement of moreInfoMenuElements) {
            moreInfoMenuElement.style.backgroundColor = "#160e2a"
        }
        event.target.style.backgroundColor = "#0e081c";
        let moreInfoContentElements = document.getElementsByClassName("more-info-content");
        for (let moreInfoContentElement of moreInfoContentElements) {
            if (moreInfoContentElement !== null)
                moreInfoContentElement.style.display = "none";
        }
        let moreInfoContentElement = document.getElementById(moreInfoContentName);
        if (moreInfoContentElement !== null)
            moreInfoContentElement.style.display = "flex";
    }

    return (

        <div className={"main-div"}>
            <Menu/>
            <div className={"product-info-container"}>
                <div className={"navigation-bar"}>
                    <p onClick={() => navigate("/")}
                       className={"navigation-item"}>{t("homePage")}</p>
                    <hr className={"divide-line"}/>
                    <p onClick={() =>
                        navigate("/" + product?.platformDto.device)}
                       className={"navigation-item"}>{product?.platformDto.device}</p>
                    <hr className={"divide-line"}/>
                    <p onClick={() => navigate("/product/" + product?.id)}
                       className={"navigation-item"}>{product?.name}</p>
                </div>
                <div className={"product-main-infos"}>
                    <img className={"product-image"} src={product?.coverImage} alt={"product"}/>
                    <div className={"product-details"}>
                        <p className={"product-name"}>{product?.name}</p>
                        <p className={"product-description"}>{description}</p>
                        <p className={"products-price"}></p>
                        <span className={"price-span"}>{product?.price} PLN</span>
                        <button onClick={() => addToCart(product)}
                                className={"add-product-to-cart"}>
                            {product?.isPreorder ? t("buyPreorder") : t("buyNow")}
                        </button>
                        <ul>
                            <li>{product?.regionalLimitations}</li>
                            <li>{product?.inStock ? t("currentlyInStock") : t("availablePreorder")}</li>
                            <li>{product?.isPreorder ? t("preorder") : t("deliverDigitally")}</li>
                        </ul>
                    </div>
                </div>
                <div className={"product-information-container"}>
                    <div className={"info-el"}>
                        <p>{t("platform")}</p>
                        <p>{product?.platformDto.name}</p>
                    </div>
                    <div className={"info-el"}>
                        <p>{t("releaseDate")}</p>
                        <p>{product?.releaseDate}</p>
                    </div>
                    <div className={"info-el"}>
                        <p>{t("languages")}</p>
                        <div className={"language-icons-container"}>
                            {languages?.map((language, index) => (
                                <img className={"language-icon"} alt={language.name} key={index}
                                     src={language.iconUrl}/>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <h1>{t("alsoLike")}</h1>
            <div className={"may-also-like-container"}>
                <ul className={"products-list"}>
                    <ProductListElement
                        products={similarProducts}/>
                </ul>
            </div>
            <div className={"product-more-info"}>
                <div className={"more-info-menu"}>
                    <p onClick={event => handleClickInfoMenuButton(event)}
                       id={"INFORMATION"}
                       className={"more-info-el"}>{t("information")}</p>
                    <p onClick={event => handleClickInfoMenuButton(event)}
                       id={"VIDEOS"}
                       className={"more-info-el"}>{t("videos")}</p>
                    <p onClick={event => handleClickInfoMenuButton(event)}
                       id={"SCREENSHOTS"}
                       className={"more-info-el"}>{t("screenshots")}</p>
                    <p onClick={event => handleClickInfoMenuButton(event)}
                       id={"ACTIVATION"}
                       className={"more-info-el"}>{t("activation")}</p>
                </div>
                <div id={"information"} className={"more-info-content"}>
                    <p>{description}</p>
                </div>
                <div id={"videos"} className={"more-info-content"}>
                    <iframe src={product?.videoUrl}
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;
                            web-share" allowFullScreen></iframe>
                </div>
                <div id={"screenshots"} className={"more-info-content"}>
                    {product?.screenshotsUrls.map((screenshot, index) => (
                        <img key={index} className={"screenshot"} alt={"screenshot"}
                             src={screenshot}/>
                    ))}
                </div>
                <div id={"activation"} className={"more-info-content"}>
                    {productActivation?.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </div>
            <SocialMedia/>
            <Footer/>
        </div>
    )
}

export default ProductPage;