import Menu from "../components/Menu";


import ProductList from "../components/ProductList";
import SocialMedia from "../components/SocialMedia";
import Footer from "../components/Footer";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import FilterProducts from "../components/FilterProducts";
function PlatformPage({deviceName}){
    const [productsPageable, setProductsPageable] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentSize, setCurrentSize] = useState(24);
    const [pagination, setPagination] = useState([]);
    const [dataLoading, setDataLoading] = useState(true)
    const [isCartPreviewVisible, setIsCartPreviewVisible] = useState(false)

    const  calculatePageNumbers = (data) =>{
        const numbers = [];
        for (let i = 0; i < data.totalPages; i++) {
            numbers.push(i);
        }
        console.log(data.totalPages)
        setPagination(numbers);
    }


    return(
        <div className={"main-div"}>
            <Menu/>
            <div className={"category-name-container"}>
                <h1>{deviceName} KEYS</h1><br/>
                <hr/>
            </div>
           <FilterProducts
               deviceName = {deviceName}
               productsPageable={productsPageable}
               setProductsPageable={setProductsPageable}
               currentPage={currentPage}
               currentSize={currentSize}
               calculatePageNumbers={calculatePageNumbers}
               setDataLoading={setDataLoading}
               setCurrentPage={setCurrentPage}
           />
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