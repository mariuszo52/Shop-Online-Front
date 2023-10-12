import Menu from "../components/Menu";
import SocialMedia from "../components/SocialMedia";
import Footer from "../components/Footer";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function ProductPage() {
    const { id} = useParams();
    const [product, setProduct] = useState(null)
    const navigate = useNavigate();
    const [languages, setLanguages] = useState(null);

    useEffect(() => {
        const params = {
            id: id
        }
        axios.get("http://localhost:8080/product", {params})
            .then(r=> setProduct(r.data))
            .catch(err => console.log("Cannot fetch product info." + err))
    }, []);

    useEffect(() => {
        const params = {
            id: id
        }
        axios.get("http://localhost:8080/language/", {params})
            .then(r=> setLanguages(r.data))
            .catch(err => console.log("Cannot fetch languages." + err))
    }, []);

    useEffect(() => {
        function changeMenuStyle() {
            window.addEventListener("scroll", () => {
                let menu = document.getElementsByClassName("menu-div");
                if (window.scrollY > 120) {
                    menu.item(0).style.position = "fixed";
                } else {
                    menu.item(0).style.position = "";
                }
            })
        }

        changeMenuStyle();
    }, []);


    return (

        <div className={"main-div"}>
            <Menu/>
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
                        <button className={"add-product-to-cart"}>TO CART</button>
                    <ul>
                        <li>CAN ACTIVATE IN POLAND</li>
                        <li>CURRENTLY IN STOCK</li>
                        <li>CODE DELIVERED TO YOU DIGITALLY</li>
                    </ul>
                </div>
                </div>
                <div className={"product-information-container"}>
                    <div className={"info-el"}>
                        <p>Plarform</p>
                        <p>{product?.platformDto.name}</p>
                    </div>
                    <div className={"info-el"}>
                        <p>Release Date</p>
                        <p>{product?.releaseDate}</p>
                    </div>
                    <div className={"info-el"}>
                        <p>Languages</p>
                        <p>{languages}</p>
                    </div>
                </div>
                <div className={"long-description"}>


                </div>
            </div>
            <SocialMedia/>
            <Footer/>
        </div>
    )
}

export default ProductPage;