import Menu from "../components/Menu"
import React, {useEffect, useState} from 'react';
import games1 from "../images/games-photos/1.jpg"
import games2 from "../images/games-photos/2.jpg"
import games3 from "../images/games-photos/3.jpg"
import cover from "../images/game-covers/wiedzmin.jpg"
import tiktokLogo from "../images/social-media/tiktok.png";
import instagramLogo from "../images/social-media/instagram.png";
import facebookLogo from "../images/social-media/facebook.png";
import cardLogo from "../images/social-media/card.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
function Home() {
    const [slideIndex, setSlideIndex] = useState(1);

    function handleMouseOut(){
        let span = document.getElementsByClassName("add-to-cart");
        for (let spanElement of span) {
            spanElement.style.display = "none"
        }
    }

    function handleMouseOver(){
        let span = document.getElementsByClassName("add-to-cart");
        for (let spanElement of span) {
            spanElement.style.display = "flex"
        }
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
                <input type={"text"}/>
                <FontAwesomeIcon id={"submit-search-icon"} icon={faMagnifyingGlass} />
            </form>

            <div className={"products-div"}>
                <ul className={"products-list"}>
                    <li onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className={"products-list-el"}>
                        <span className={"add-to-cart"}>DO KOSZYKA</span>
                        <img src={cover} alt={"game-name"}/>
                        <p>GAME NAME</p>
                        <p>GAME Price</p>
                    </li>
                    <li className={"products-list-el"}>
                        <img src={cover} alt={"game-name"}/>
                        <p>GAME NAME</p>
                        <p>GAME Price</p>
                    </li>
                    <li className={"products-list-el"}>
                        <img src={cover} alt={"game-name"}/>
                        <p>GAME NAME</p>
                        <p>GAME Price</p>
                    </li>
                    <li className={"products-list-el"}>
                        <img src={cover} alt={"game-name"}/>
                        <p>GAME NAME</p>
                        <p>GAME Price</p>
                    </li>
                    <li className={"products-list-el"}>
                        <img src={cover} alt={"game-name"}/>
                        <p>GAME NAME</p>
                        <p>GAME Price</p>
                    </li>
                    <li className={"products-list-el"}>
                        <img src={cover} alt={"game-name"}/>
                        <p>GAME NAME</p>
                        <p>GAME Price</p>
                    </li>
                    <li className={"products-list-el"}>
                        <img src={cover} alt={"game-name"}/>
                        <p>GAME NAME</p>
                        <p>GAME Price</p>
                    </li>
                    <li className={"products-list-el"}>
                        <img src={cover} alt={"game-name"}/>
                        <p>GAME NAME</p>
                        <p>GAME Price</p>
                    </li>
                </ul>
                <div className={"pagination-bar"}>
                    <p>20 of 50 games loaded</p>
                    <div className={"pages-numbers"}>
                        <p>prev</p>
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>next</p>
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
