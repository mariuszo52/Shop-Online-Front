import Menu from "../components/Menu";


import ProductList from "../components/ProductList";
import SocialMedia from "../components/SocialMedia";
import Footer from "../components/Footer";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import FilterProducts from "../components/FilterProducts";
function PlatformPage({platformName}){
    const [productsPageable, setProductsPageable] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentSize, setCurrentSize] = useState(24);
    const [pagination, setPagination] = useState([]);
    const [dataLoading, setDataLoading] = useState(true)

    function calculatePageNumbers(data) {
        const numbers = [];
        for (let i = 0; i < data.totalPages; i++) {
            numbers.push(i);
        }
        setPagination(numbers);
    }

    useEffect(() => {
        async function fetchProducts() {
            setDataLoading(true)
            const params = {
                page: currentPage,
                size: currentSize,
                platform: platformName
            };
            await axios.get("http://localhost:8080", {params})
                .then(response => {
                    setProductsPageable(response.data)
                    calculatePageNumbers(response.data)
                    console.log(response.data)
                })
                .catch(error => console.log(error));
            setDataLoading(prevState => false)

        }
        fetchProducts()
    },[]);

    return(
        <div className={"main-div"}>
            <Menu/>
            <div className={"category-name-container"}>
                <h1>{platformName} KEYS</h1><br/>
                <hr/>
            </div>
           <FilterProducts productsPageable={productsPageable} />
            <br/>
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
    )
}
export default PlatformPage;