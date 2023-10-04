import React, {useEffect, useState} from "react";
import axios from "axios";

function FilterProducts({
                            productsPageable,
                            setProductsPageable,
                            currentPage,
                            currentSize,
                            deviceName,
                            calculatePageNumbers,
                            setDataLoading
                        }) {
    let [platforms, setPlatforms] = useState([]);
    let [genres, setGenres] = useState([]);
    let [languages, setLanguages] = useState([]);
    let [minPrice, setMinPrice] = useState()
    let [maxPrice, setMaxPrice] = useState()
    let [platform, setPlatform] = useState("");


    useEffect(() => {
        function getPlatforms() {
            let uniquePlatforms = []
            for (const product of productsPageable.content) {
                let platform = product.platformDto.name;
                if (!uniquePlatforms?.includes(platform)) {
                    uniquePlatforms.push(platform)
                }
            }
            setPlatforms(uniquePlatforms);
        }

        if (productsPageable !== null) {
            getPlatforms()
        }
    }, [productsPageable]);

    useEffect(() => {
        const params = {
            device:deviceName
        };

       async function getGenres() {
           await axios.get("http://localhost:8080/genre/device-genres", {params})
                .then(r => setGenres(r.data))
               .then(err => console.log(err))
        }
        getGenres()
    }, [productsPageable]);

    useEffect(() => {
        function getLanguages() {
            let uniqueLanguages = []
            for (const product of productsPageable.content) {
                let productLanguages = product.languages;
                for (const language of productLanguages) {
                    if (!uniqueLanguages?.includes(language)) {
                        uniqueLanguages.push(language)
                    }
                }
            }
            setLanguages(uniqueLanguages)
        }

        if (productsPageable !== null) {
            getLanguages()
        }
    }, [productsPageable]);


    function handleMinPrice(event) {
        setMinPrice(event.target.value)
    }

    function handleMaxPrice(event) {
        setMaxPrice(event.target.value)
    }

    async function filterProducts() {
        setDataLoading(true)
        const params = {
            page: currentPage,
            size: currentSize,
            device: deviceName,
            platform: platform
        };
        await axios.get("http://localhost:8080", {params})
            .then(response => {
                setProductsPageable(response.data)
                calculatePageNumbers(response.data)
                console.log(response.data)
                setDataLoading(false)
            })
            .catch(error => console.log(error));
    }

    return (
        <div className="filter-container">
            <label><p>Sort By</p>
                <select className={"filter"}>
                    <option className={"filter-option"}>Name ASC</option>
                    <option className={"filter-option"}>Name DESC</option>
                    <option className={"filter-option"}>Price ASC</option>
                    <option className={"filter-option"}>Price DESC</option>
                    <option className={"filter-option"}>Release date ASC</option>
                    <option className={"filter-option"}>Release date DESC</option>
                </select>
            </label>
            <label><p>Platform</p>
                <select onChange={event => setPlatform(event.target.value)}
                        value={""} className={"filter"}>
                    <option className={"filter-option"}>All platforms</option>
                    {platforms?.map((platform, index) => (
                        <option value={platform} key={index}
                                className={"filter-option"}>{platform}</option>
                    ))}
                </select>
            </label>
            <label><p>Region</p>
                <select className={"filter"}>
                    <option className={"filter-option"}>All regions</option>
                    <option className={"filter-option"}>Poland</option>
                </select>
            </label>
            <label>
                <p>Price</p>
                <input onChange={event => handleMinPrice(event)}
                       defaultValue={0} type="range" id="minRange" min="0" max="100"/>
                <p>{minPrice}</p>
                <input onChange={event => handleMaxPrice(event)}
                       type="range" id="maxRange" min="0" max="100" defaultValue={10000}/>
                <p>{maxPrice}</p>
            </label>
            <label><p>Genre</p>
                <select className={"filter"}>
                    <option className={"filter-option"}>All genres</option>
                    {genres?.map((genre, index) => (
                        <option key={index} className={"filter-option"}>{genre}</option>
                    ))}
                </select>
            </label>
            <label><p>Language</p>
                <select className={"filter"}>
                    <option className={"filter-option"}>All languages</option>
                    {languages?.map((language, index) => (
                        <option key={index} className={"filter-option"}>{language}</option>
                    ))}
                </select>
            </label>
            <button onClick={filterProducts}>Filter</button>
        </div>
    )
}

export default FilterProducts;