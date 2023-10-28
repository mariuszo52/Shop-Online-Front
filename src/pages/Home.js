import Menu from "../components/Menu"
import React, {useEffect, useState} from 'react';
import games1 from "../images/games-photos/1.jpg"
import games2 from "../images/games-photos/2.jpg"
import games3 from "../images/games-photos/3.jpg"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import Pagination from "../components/Pagination";
import SocialMedia from "../components/SocialMedia";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";
import CartPreview from "../components/CartPreview";

function Home() {
    const [slideIndex, setSlideIndex] = useState(1);
    const [productsPageable, setProductsPageable] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentSize, setCurrentSize] = useState(24);
    const [pagination, setPagination] = useState([]);
    const [dataLoading, setDataLoading] = useState(true)
    const [productName, setProductName] = useState(null)
    const [isCartPreviewVisible, setIsCartPreviewVisible] = useState(false)



    function calculatePageNumbers(data) {
        const numbers = [];
        for (let i = 0; i < data?.totalPages; i++) {
            numbers.push(i);
        }
        setPagination(numbers);
    }


    async function fetchProducts() {
        setDataLoading(true)
        const params = {
            page: currentPage,
            size: currentSize,
        };
        if (productName !== null) {
            params.name = productName;
        }
        await axios.get("http://localhost:8080/products", {params})
            .then(response => {
                setProductsPageable(response.data)
                calculatePageNumbers(response.data)
                console.log(response.data)
            })
            .catch(error => console.log(error));
        setDataLoading(prevState => false)

    }

    useEffect(() => {
        fetchProducts().then(() => {
            console.log("Products fetched")
        })
    }, [currentPage]);


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


    function handleEnterDown(event) {
        if (event.keyCode === 13) {
            fetchProducts();
        }
    }

    return (
        <div className={"main-div"}>
            <Menu/>
            <div className="slideshow-container">
                <img alt={"slide1"} id={"first-slide"} className={"slide"} src={games1}/>
                <img alt={"slide2"} className={"slide"} src={games2}/>
                <img alt={"slide3"} className={"slide"} src={games3}/>
            </div>
            <br/>
            <div className={"search-form"}>
                <input onKeyDown={event => handleEnterDown(event)}
                       onChange={event => setProductName(event.target.value)} type={"text"}
                       placeholder={"Insert name of game you want to find."}/>
                <FontAwesomeIcon onClick={fetchProducts} className={"submit-search-icon"} icon={faMagnifyingGlass}/>
            </div>
            <ProductList
                productsPageable={productsPageable}
                dataLoading={dataLoading}
                />
            <Pagination
                productsPageable={productsPageable}
                pagination={pagination}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                currentSize={currentSize}
            />
            <SocialMedia/>
            <Footer/>
        </div>
    );
}

export default Home;
