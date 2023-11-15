import React, {useEffect, useState} from "react";
import axios from "axios";

function FilterProducts({
                            productsPageable,
                            setProductsPageable,
                            currentPage,
                            currentSize,
                            deviceName,
                            calculatePageNumbers,
                            setDataLoading,
                            setCurrentPage
                        }) {
    let [platforms, setPlatforms] = useState([]);
    let [genres, setGenres] = useState([]);
    let [languages, setLanguages] = useState([]);
    let [minPrice, setMinPrice] = useState()
    let [maxPrice, setMaxPrice] = useState()
    let [platform, setPlatform] = useState("");
    let [region, setRegion] = useState("");
    let [genre, setGenre] = useState("");
    let [language, setLanguage] = useState("");
    let [sort, setSort] = useState("");




    useEffect(() => {
        const params = {
            device:deviceName
        };

        async function getPlatforms() {
            await axios.get("http://localhost:8080/platform/device-platforms", {params})
                .then(r => setPlatforms(r.data))
                .then(err => console.log(err))
        }
        getPlatforms()
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
        async function getLanguages() {
            await axios.get("http://localhost:8080/language/all")
                .then(r => setLanguages(r.data))
                .then(err => console.log(err))
        }
        getLanguages()

    }, [productsPageable]);


    function handleMinPrice(event) {
        setMinPrice(event.target.value)
    }

    function handleMaxPrice(event) {
        setMaxPrice(event.target.value)
    }
    function handleFilterClick(){
        setCurrentPage(0)
        filterProducts()
    }
        async function filterProducts() {
        setDataLoading(true)
        const params = {
            page: currentPage,
            size: currentSize,
            device: deviceName,
            platform: platform,
            language: language,
            region: region,
            genre: genre,
            minPrice: minPrice,
            maxPrice: maxPrice,
            sort: sort
        };
        await axios.get("http://localhost:8080/product/products", {params})
            .then(response => {
                setProductsPageable(response.data)
                calculatePageNumbers(response.data)
                console.log(response.data)
                setDataLoading(false)
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        filterProducts()
    }, [currentPage]);

    return (
        <div className="filter-container">
            <label><p>Sort By</p>
                <select onChange={event => setSort(event.target.value)} className={"filter"}>
                    <option value={"ASC,name"} className={"filter-option"}>Name ASC</option>
                    <option value={"DESC,name"} className={"filter-option"}>Name DESC</option>
                    <option value={"ASC,price"} className={"filter-option"}>Price ASC</option>
                    <option value={"DESC,price"} className={"filter-option"}>Price DESC</option>
                    <option value={"ASC,releaseDate"} className={"filter-option"}>Release date ASC</option>
                    <option value={"DESC,releaseDate"} className={"filter-option"}>Release date DESC</option>
                </select>
            </label>
            <label><p>Platform</p>
                <select onChange={event => setPlatform(event.target.value)}
                        className={"filter"}>
                    <option className={"filter-option"} value={""}>All platforms</option>
                    {platforms?.map((platform, index) => (
                        <option value={platform} key={index}
                                className={"filter-option"}>{platform}</option>
                    ))}
                </select>
            </label>
            <label><p>Region</p>
                <select onChange={event => setRegion(event.target.value)} className={"filter"}>
                    <option className={"filter-option"} value={""}>All regions</option>
                    <option className={"filter-option"} value={"Poland"}>Poland</option>
                </select>
            </label>
            <label>
                <p>Min Price: <span><input value={minPrice} onChange={event => handleMinPrice(event)} type={"number"}/>PLN</span></p>
                <input onChange={event => handleMinPrice(event)}
                       value={minPrice} defaultValue={0} step={10} type="range" id="minRange" min="0" max="10000"/>
                <p>Max Price: <span><input value={maxPrice} onChange={event => handleMaxPrice(event)} type={"number"}/>PLN</span></p>
                <input onChange={event => handleMaxPrice(event)}
                       value={maxPrice} type="range" step={10} id="maxRange" min="0" max="10000" defaultValue={10000}/>
            </label>
            <label><p>Genre</p>
                <select onChange={event => setGenre(event.target.value)} className={"filter"}>
                    <option className={"filter-option"} value={""}>All genres</option>
                    {genres?.map((genre, index) => (
                        <option key={index} className={"filter-option"}>{genre}</option>
                    ))}
                </select>
            </label>
            <label><p>Language</p>
                <select onChange={event => setLanguage(event.target.value)} className={"filter"}>
                    <option className={"filter-option"} value={""}>All languages</option>
                    {languages?.map((language, index) => (
                        <option key={index} className={"filter-option"}>{language}</option>
                    ))}
                </select>
            </label>
            <button onClick={handleFilterClick}>Filter</button>
        </div>
    )
}

export default FilterProducts;