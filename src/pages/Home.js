import Menu from "../components/Menu"
import React, {useEffect, useState} from 'react';
import games1 from "../images/games-photos/1.jpg"
import games2 from "../images/games-photos/2.jpg"
import games3 from "../images/games-photos/3.jpg"
import cover from "../images/game-covers/wiedzmin.jpg"


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
                <img id={"first-slide"} className={"slide"} src={games1}/>
                <img className={"slide"} src={games2}/>
                <img className={"slide"} src={games3}/>
            </div>
                <ul className={"section-list"}>
                    <li className={"section-list-el"}>News</li>
                    <li className={"section-list-el"}>Promotions</li>
                    <li className={"section-list-el"}>Secondhand</li>
                    <li className={"section-list-el"}>Preorder</li>
                </ul>
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
            </div>
        </div>
    );
}

export default Home;
