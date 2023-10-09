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

    useEffect(() => {
        const params = {
            id: id
        }
        axios.get("http://localhost:8080/product", {params})
            .then(r=> setProduct(r.data))
            .catch(err => console.log("Cannot fetch product info." + err))
    }, []);

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
                    <p className={"products-price"}></p>
                        <p>{product?.price}</p>
                        <button className={"add-product-to-cart"}>To cart</button>
                    <ul>
                        <li>CAN ACTIVATE IN POLAND</li>
                        <li>CURRENTLY IN STOCK</li>
                        <li>CODE DELIVERED TO YOU DIGITALLY</li>
                    </ul>
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