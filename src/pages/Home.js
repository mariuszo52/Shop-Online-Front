import Menu from "../components/Menu"
import React, {useEffect, useState} from 'react';
import games1 from "../images/games-photos/1.jpg"
import games2 from "../images/games-photos/2.jpg"
import games3 from "../images/games-photos/3.jpg"
import tiktokLogo from "../images/social-media/tiktok.png";
import instagramLogo from "../images/social-media/instagram.png";
import facebookLogo from "../images/social-media/facebook.png";
import cardLogo from "../images/social-media/card.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faHeart} from "@fortawesome/free-solid-svg-icons";
import {ThreeCircles} from 'react-loader-spinner';
import axios from 'axios';
function Home() {
    const [slideIndex, setSlideIndex] = useState(1);
    const [productsPageable, setProductsPageable] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentSize, setCurrentSize] = useState(24);
    const [lastProductIndex, setLastProductIndex] = useState(0);
    const [pagination, setPagination] = useState([]);
    const [dataLoading, setDataLoading] = useState(true)
    const [productName, setProductName] = useState(null)

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

    async function fetchProducts() {
        setDataLoading(true)
        const params = {
            page: currentPage,
            size: currentSize,
        };
        if (productName !== null) {
            params.name = productName;
        }
        await axios.get("http://localhost:8080", {params})
            .then(response => {
                setProductsPageable(response.data)
                calculatePageNumbers(response.data)
                console.log(response.data)
            })
            .catch(error => console.log(error));
        setDataLoading(prevState => false)

    }

    useEffect(() => {
        fetchProducts().then(() =>{
            console.log("Products fetched")
        })
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
            setCurrentPage(prevState => prevState - 1)
        }
    }

    function setNextPage() {
        if(currentPage < productsPageable.totalPages -1){
            setCurrentPage(prevState => prevState + 1)
        }

    }

    function handlePageClick(pageValue) {
        setCurrentPage(pageValue)
    }

    function setFirstPage() {
        setCurrentPage(0)
    }
    function setLastPage() {
        setCurrentPage(productsPageable.totalPages -1)
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
            <div className={"search-form"}>
                <input onChange={event => setProductName(event.target.value)} type={"text"} placeholder={"Insert name of game you want to find."}/>
                <FontAwesomeIcon onClick={fetchProducts} className={"submit-search-icon"} icon={faMagnifyingGlass} />
            </div>

            <div className={"products-div"}>
                {!dataLoading ?( <ul className={"products-list"}>
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
                </ul>) :
                    <ul className={"products-list"}>
                    <ThreeCircles
                        color="#00BFFF"
                        height={200}
                        width={200}
                    />
                    </ul>
                }
                <div className={"pagination-bar"}>
                    <p>{(currentPage) * currentSize} - {lastProductIndex < productsPageable.totalElements ? lastProductIndex : productsPageable.totalElements} of {productsPageable.totalElements}  games loaded</p>
                    <p>Current page: {currentPage + 1}</p>
                    <div className={"pages-numbers"}>
                        <li onClick={setFirstPage}>first</li>
                        <li onClick={setPreviousPage}>prev</li>
                        {productsPageable.totalPages <= 15 ? (
                            pagination?.map((value, index) => (
                                <li className={"page-button"} id={"page-button" + value} key={index} onClick={() => handlePageClick(value)}>
                                    {value + 1}
                                </li>
                            ))
                        ) : (
                            <>
                                {pagination?.slice(currentPage -3, currentPage).map((value, index) => (
                                    <li className={"page-button"} id={"page-button" + value} key={index} onClick={() => handlePageClick(value)}>
                                        {value + 1}
                                    </li>
                                ))}
                                <li>...</li>
                                {pagination?.slice(currentPage, currentPage +3).map((value, index) => (
                                    <li className={"page-button"} id={"page-button" + value} key={index} onClick={() => handlePageClick(value)}>
                                        {value + 1}
                                    </li>
                                ))}
                            </>
                        )}
                        <li onClick={setNextPage}>next</li>
                        <li onClick={setLastPage}>last</li>
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
