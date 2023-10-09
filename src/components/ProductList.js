import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { ThreeCircles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

function ProductList({ productsPageable, dataLoading }) {
    const navigate = useNavigate();

    function handleMouseOut(index) {
        let span = document.getElementsByClassName("add-to-cart");
        let favButton = document.getElementsByClassName("add-to-fav");
        favButton[index].style.display = "none";
        span[index].style.display = "none";
    }

    function handleMouseOver(index) {
        let span = document.getElementsByClassName("add-to-cart");
        let favButton = document.getElementsByClassName("add-to-fav");
        favButton[index].style.display = "flex";
        span[index].style.display = "flex";
    }

    function handleFavIconClick(index) {
        let favIcon = document.getElementsByClassName("add-to-fav")[index];
        let computedStyle = window.getComputedStyle(favIcon);
        let color = computedStyle.getPropertyValue("color");
        if (color === "rgb(0, 128, 0)") {
            favIcon.style.scale = "3.5";
            favIcon.style.color = "red";
        } else {
            favIcon.style.scale = "3.0";
            favIcon.style.color = "green";
        }
    }

    return (
        <div className={"products-div"}>
            {!dataLoading ? (
                <ul className={"products-list"}>
                    {productsPageable.content?.map((product, index) => (
                        <li
                            onClick={event => navigate("/product/" + product.id)}
                            key={index}
                            onMouseOver={() => handleMouseOver(index)}
                            onMouseOut={() => handleMouseOut(index)}
                            className={"products-list-el"}
                        >
                            <span className={"add-to-cart"}>TO CART</span>
                            <FontAwesomeIcon
                                onClick={() => handleFavIconClick(index)}
                                className={"add-to-fav"}
                                icon={faHeart}
                            />
                            <img src={product.coverImage} alt={product.name} />
                            <div className={"product-main-info"}>
                                <p id={"product-name"}>{product.name}</p>
                                <p id={"product-price"}>{product.price} PLN</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <ul className={"products-list"}>
                    <ThreeCircles color="#00BFFF" height={200} width={200} />
                </ul>
            )}
            {productsPageable?.content?.length === 0 && (
                <div className={"no-products-div"}>
                    <h1>PRODUCTS NOT FOUND!</h1>
                </div>
            )}
        </div>
    );
}

export default ProductList;
