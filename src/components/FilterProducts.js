import React, {useEffect, useState} from "react";
import axios from "axios";
import {useTranslation} from "react-i18next";

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
    const {t} = useTranslation()                       
    let [platforms, setPlatforms] = useState(null);
    let [genres, setGenres] = useState(null);
    let [languages, setLanguages] = useState(null);
    let [minPrice, setMinPrice] = useState()
    let [maxPrice, setMaxPrice] = useState()
    let [platform, setPlatform] = useState(null);
    let [genre, setGenre] = useState(null);
    let [language, setLanguage] = useState(null);
    let [sort, setSort] = useState(null);


    useEffect(() => {
        const params = {
            device: deviceName
        };

        function getPlatforms() {
            axios.get(process.env.REACT_APP_SERVER_URL + "/platform/device-platforms", {params})
                .then(r => setPlatforms(r.data))
                .catch(err => console.log(err))
        }

        getPlatforms()
    }, [productsPageable]);

    useEffect(() => {
        const params = {
            device: deviceName
        };

        function getGenres() {
            axios.get(process.env.REACT_APP_SERVER_URL + "/genre/device-genres", {params})
                .then(r => setGenres(r.data))
                .catch(err => console.log(err))
        }

        getGenres()
    }, [productsPageable]);

    useEffect(() => {
        function getLanguages() {
            axios.get(process.env.REACT_APP_SERVER_URL + "/language/all")
                .then(r => setLanguages(r.data))
                .catch(err => console.log(err))
        }

        getLanguages()

    }, [productsPageable]);


    function handleMinPrice(event) {
        setMinPrice(event.target.value)
    }

    function handleMaxPrice(event) {
        setMaxPrice(event.target.value)
    }

    function handleFilterClick() {
        setCurrentPage(0)
        filterProducts()
    }

    function filterProducts() {
        setDataLoading(true)
        const params = {
            page: currentPage,
            size: currentSize,
            device: deviceName,
            platform: platform,
            language: language,
            genre: genre,
            minPrice: minPrice,
            maxPrice: maxPrice,
            sort: sort
        };
        axios.get(process.env.REACT_APP_SERVER_URL + "/product/products", {params})
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
            <label><p>{t("sortBy")}</p>
                <select onChange={event => setSort(event.target.value)} className={"filter"}>
                    <option value={"ASC,name"} className={"filter-option"}>{t("nameAsc")}</option>
                    <option value={"DESC,name"} className={"filter-option"}>{t("nameDesc")}</option>
                    <option value={"ASC,price"} className={"filter-option"}>{t("priceAsc")}</option>
                    <option value={"DESC,price"} className={"filter-option"}>{t("priceDesc")}</option>
                    <option value={"ASC,releaseDate"} className={"filter-option"}>{t("dateAsc")}</option>
                    <option value={"DESC,releaseDate"} className={"filter-option"}>{t("dateDesc")}</option>
                </select>
            </label>
            <label><p>{t("platform")}</p>
                <select onChange={event => setPlatform(event.target.value)}
                        className={"filter"}>
                    <option className={"filter-option"} value={""}>{t("allPlatforms")}</option>
                    {platforms?.map((platform, index) => (
                        <option value={platform} key={index}
                                className={"filter-option"}>{platform}</option>
                    ))}
                </select>
            </label>
            <label>
                <p>Min {t("price")}: <span><input value={minPrice} onChange={event => handleMinPrice(event)} type={"number"}/>PLN</span>
                </p>
                <input onChange={event => handleMinPrice(event)}
                       value={minPrice} defaultValue={0} step={10} type="range" id="minRange" min="0" max="10000"/>
                <p>Max {t("price")}: <span><input value={maxPrice} onChange={event => handleMaxPrice(event)} type={"number"}/>PLN</span>
                </p>
                <input onChange={event => handleMaxPrice(event)}
                       value={maxPrice} type="range" step={10} id="maxRange" min="0" max="10000" defaultValue={10000}/>
            </label>
            <label><p>{t("genre")}</p>
                <select onChange={event => {
                    setGenre(event.target.value)}}
                    className={"filter"}>
                    <option className={"filter-option"} value={null}>{t("allGenres")}</option>
                    {genres?.map((genre, index) => (
                        <option key={index} className={"filter-option"}>{genre}</option>
                    ))}
                </select>
            </label>
            <label><p>{t("languages")}</p>
                <select onChange={event => setLanguage(event.target.value)} className={"filter"}>
                    <option className={"filter-option"} value={""}>{t("allLanguages")}</option>
                    {languages?.map((language, index) => (
                        <option key={index} className={"filter-option"}>{language}</option>
                    ))}
                </select>
            </label>
            <div className={"filter-button-div"}>
                <button className={"filter-button"} onClick={handleFilterClick}>{t("filter")}</button>
            </div>
        </div>
    )
}

export default FilterProducts;