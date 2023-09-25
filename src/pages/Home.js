import Menu from "../components/Menu"
import React, {useEffect, useState, useRef, useMemo} from 'react';
import games1 from "../images/games-photos/1.jpg"
import games2 from "../images/games-photos/2.jpg"
import games3 from "../images/games-photos/3.jpg"
import tiktokLogo from "../images/social-media/tiktok.png";
import instagramLogo from "../images/social-media/instagram.png";
import facebookLogo from "../images/social-media/facebook.png";
import cardLogo from "../images/social-media/card.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faHeart} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
function Home() {
    const [slideIndex, setSlideIndex] = useState(1);
    const [productsPageable, setProductsPageable] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentSize, setCurrentSize] = useState(24);
    const [lastProductIndex, setLastProductIndex] = useState(0);
    const [pagination, setPagination] = useState([]);
    const [pageButton, setPageButton] = useState(0);
    let buttons = document.getElementsByClassName("page-button");

    function calculatePageNumbers(data){
        const numbers = [];
        for (let i= 0 ; i < data.totalPages ; i++ ){
            numbers.push(i);
        }
        setPagination(numbers);
    }

    useEffect(() => {
        setLastProductIndex((currentPage * currentSize) + currentSize);
    }, [currentPage, currentSize]);



    useEffect(() => {
        async function fetchProducts() {
            const params = {
                page: currentPage,
                size: currentSize,
            };
            await axios.get("http://localhost:8080", {params})
                .then(response => {
                    setProductsPageable(response.data)
                    calculatePageNumbers(response.data)
                    console.log(response.data)
                })
                .catch(error => console.log(error));
        }
        fetchProducts().then(() => console.log("Products fetched"))
    }, [currentPage]);

    function handleMouseOut(index){
        let span = document.getElementsByClassName("add-to-cart");
        let favButton = document.getElementsByClassName("add-to-fav");
        favButton[index].style.display = "none"
        span[index].style.display = "none"
    }

    function handleMouseOver(index){
        let span = document.getElementsByClassName("add-to-cart");
        let favButton = document.getElementsByClassName("add-to-fav");
        favButton[index].style.display = "flex"
        span[index].style.display = "flex"

    }


    useEffect(() => {
        function sliderChange() {
            let slides = document.getElementsByClassName("slide");
            if (slideIndex === 0) {
                slides[slides.length - 1].style.display = "none";
                slides[0].style.display = "flex";
            } else {
                slides[slideIndex - 1].style.display = "none";
                slides[slideIndex].style.display = "flex";
            }
            setSlideIndex(prevSlideIndex => (prevSlideIndex + 1) % slides.length);
        }

        const intervalId = setInterval(sliderChange, 5000);

        return () => {
            clearInterval(intervalId);
        }
    }, [slideIndex]);


    function handleFavIconClick(index) {
        let favIcon = document.getElementsByClassName("add-to-fav")[index];
        let computedStyle = window.getComputedStyle(favIcon);
        let color = computedStyle.getPropertyValue("color");
        if (color === "rgb(0, 128, 0)"){
            favIcon.style.scale = "3.5";
            favIcon.style.color = "red";
        }
        else {
            favIcon.style.scale = "3.0";
            favIcon.style.color = "green"
        }
    }

     function setPreviousPage() {
        if (currentPage > 0 ){
            for (let button of buttons) {
                button.style.backgroundColor = "initial"
            }
            buttons.item(currentPage - 1).style.backgroundColor = "grey"
            setCurrentPage(prevState => prevState - 1)
        }
    }

    function setNextPage() {
        if(currentPage < productsPageable.totalPages -1){
            for (let button of buttons) {
                button.style.backgroundColor = "initial"
            }
            buttons.item(currentPage +1).style.backgroundColor = "grey"
            setCurrentPage(prevState => prevState + 1)


        }

    }

    function handlePageClick(pageValue) {
        setCurrentPage(pageValue)
        setPageButton(pageValue)
        for (let button of buttons) {
            button.style.backgroundColor = "initial"
        }
        buttons.item(pageValue).style.backgroundColor = "grey"


    }

    return (
        <div className={"main-div"}>
            <Menu/>
            <div className="slideshow-container">
                <img alt={"slide1"} id={"first-slide"} className={"slide"} src={games1}/>
                <img alt={"slide2"} className={"slide"} src={games2}/>
                <img alt={"slide3"} className={"slide"} src={games3}/>
            </div>
                <ul className={"section-list"}>
                    <li className={"section-list-el"}>News</li>
                    <li className={"section-list-el"}>Promotions</li>
                    <li className={"section-list-el"}>Secondhand</li>
                    <li className={"section-list-el"}>Preorder</li>
                </ul>
            <br/>
            <form className={"search-form"}>
                <input type={"text"} placeholder={"Insert name of game you want to find."}/>
                <FontAwesomeIcon className={"submit-search-icon"} icon={faMagnifyingGlass} />
            </form>

            <div className={"products-div"}>
                <ul className={"products-list"}>
                    {productsPageable.content?.map((product, index) => (
                        <li key={index} onMouseOver={() =>  handleMouseOver(index)} onMouseOut={() => handleMouseOut(index)} className={"products-list-el"}>
                            <span className={"add-to-cart"}>TO CART</span>
                            <FontAwesomeIcon onClick={() => handleFavIconClick(index)} className={"add-to-fav"} icon={faHeart} />
                            <img src={product.coverImage} alt={product.name}/>
                            <div className={"product-main-info"}>
                                <p id={"product-name"}>{product.name}</p>
                                <p id={"product-price"}>{product.price} PLN</p>
                            </div>

                        </li>
                    ))}
                </ul>
                <div className={"pagination-bar"}>
                    <p>{(currentPage) * currentSize} - {lastProductIndex < productsPageable.totalElements ? lastProductIndex : productsPageable.totalElements} of {productsPageable.totalElements}  games loaded</p>
                    <div className={"pages-numbers"}>
                        <li onClick={setPreviousPage}>prev</li>
                        {pagination?.map((value, index) =>(
                            <li className={"page-button"} id={"page-button" + value} key={index} onClick={() => handlePageClick(value)}>{value + 1}</li>
                        ))}
                        <li onClick={setNextPage}>next</li>
                    </div>
                </div>
            </div>
            <div className={"info-div"}>
                <div className={"social-media-div"}>
                    <p>SOCIAL MEDIA</p>
                    <img alt={"facebook"} src={facebookLogo} />
                    <img alt={"instagram"} src={instagramLogo} />
                    <img alt={"tiktok"} src={tiktokLogo} />
                </div>
                <div className={"payment-methods-div"}>
                    <p>PAYMENT METHODS</p>
                    <img alt={"card"} src={cardLogo} />

                </div>
            </div>
            <footer className={"footer"}>
                <p>Copyright cd-keys.com.pl 2023, all rights reserved</p>
            </footer>
        </div>
    );
}

export default Home;
