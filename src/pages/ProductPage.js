import Menu from "../components/Menu";
import SocialMedia from "../components/SocialMedia";
import Footer from "../components/Footer";
import {useLocation, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import ProductListElement from "../components/ProductListElement";
import {useCart} from "../context/CartContext";
import {useNotification} from "../context/NotificationContext";

function ProductPage() {
    const {id} = useParams();
    const [product, setProduct] = useState(null)
    const navigate = useNavigate();
    const [languages, setLanguages] = useState([]);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [productActivation, setProductActivation] = useState([]);
    const {addToCart} = useCart();

    useEffect(() => {
        function activationInfo() {
            let activationParagraphs = product?.activationDetails.split("\n");
            setProductActivation(activationParagraphs)
        }

        activationInfo()
    }, [product, id]);

    useEffect(() => {
        async function getProduct() {
            const params = {
                id: id
            }
            await axios.get("http://localhost:8080/product", {params})
                .then(r => setProduct(r.data))
                .catch(err => console.log("Cannot fetch product info." + err))
        }
        getProduct()
    }, [id]);

    useEffect(() => {
        async function getSimilarProducts() {
            const params = {
                id: id
            }
            await axios.get("http://localhost:8080/product/similar-products", {params})
                .then(r => setSimilarProducts(r.data))
                .catch(err => console.log("Cannot fetch product info." + err))
        }
        getSimilarProducts()
    }, [id]);

    useEffect(() => {
        async function getLanguages() {
            const params = {
                id: id
            }
            await axios.get("http://localhost:8080/language", {params})
                .then(r => setLanguages(r.data))
                .catch(err => console.log("Cannot fetch languages." + err))
        }
        getLanguages()
    }, [id]);

    const handleClickInfoMenuButton = (event) => {
        let moreInfoContentName = event.target.textContent.toLowerCase();
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
            <Menu />
            <div className={"product-info-container"}>
                <div className={"navigation-bar"}>
                    <p onClick={() => navigate("/")}
                       className={"navigation-item"}>Home</p>
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
                        <p className={"product-description"}>{product?.description}</p>
                        <p className={"products-price"}></p>
                        <span className={"price"}>{product?.price} PLN</span>
                        <button onClick={() => addToCart(product)} className={"add-product-to-cart"}>TO CART</button>
                        <ul>
                            <li>CAN ACTIVATE IN POLAND</li>
                            <li>CURRENTLY IN STOCK</li>
                            <li>CODE DELIVERED TO YOU DIGITALLY</li>
                        </ul>
                    </div>
                </div>
                <div className={"product-information-container"}>
                    <div className={"info-el"}>
                        <p>Platform</p>
                        <p>{product?.platformDto.name}</p>
                    </div>
                    <div className={"info-el"}>
                        <p>Release Date</p>
                        <p>{product?.releaseDate}</p>
                    </div>
                    <div className={"info-el"}>
                        <p>Languages</p>
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
            <h1>YOU MAY ALSO LIKE</h1>
            <div className={"may-also-like-container"}>
                <ul className={"products-list"}>
                    <ProductListElement
                        products={similarProducts}/>
                </ul>
            </div>
            <div className={"product-more-info"}>
                <div className={"more-info-menu"}>
                    <p onClick={event => handleClickInfoMenuButton(event)}
                       className={"more-info-el"}>INFORMATION</p>
                    <p onClick={event => handleClickInfoMenuButton(event)}
                       className={"more-info-el"}>VIDEOS</p>
                    <p onClick={event => handleClickInfoMenuButton(event)}
                       className={"more-info-el"}>SCREENSHOTS</p>
                    <p onClick={event => handleClickInfoMenuButton(event)}
                       className={"more-info-el"}>ACTIVATION</p>
                </div>
                <div id={"information"} className={"more-info-content"}>
                    <h1>What are the system requirements?</h1>
                    <p>{product?.systemRequirements}</p>
                </div>
                <div id={"videos"} className={"more-info-content"}>
                    {product?.videoUrls.map((video, index) => (
                        <iframe src={video} key={index}
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;
                            web-share" allowFullScreen></iframe>

                    ))}
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