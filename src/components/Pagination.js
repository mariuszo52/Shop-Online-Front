
import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";

function Pagination({productsPageable, currentPage, setCurrentPage, currentSize, pagination}) {
    const [lastProductIndex, setLastProductIndex] = useState(0);
    const {t, i18n} = useTranslation()



    function setPreviousPage() {
        if (currentPage > 0) {
            setCurrentPage(prevState => prevState - 1)
        }
    }

    function setNextPage() {
        if (currentPage < productsPageable?.totalPages - 1) {
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
        setCurrentPage(productsPageable?.totalPages - 1)
    }

    useEffect(() => {
        setLastProductIndex((currentPage * currentSize) + currentSize);
    }, [currentPage, currentSize]);


    return (
        <div className={"pagination-bar"}>
            <p>{(currentPage) * currentSize} - {lastProductIndex < productsPageable?.totalElements ? lastProductIndex :
                productsPageable?.totalElements} {t("pagination.total", {total: productsPageable?.totalElements})}</p>
            <p>{t("pagination.current")} {currentPage + 1}</p>
            <div className={"pages-numbers"}>
                <li className={"page-navigate"} onClick={setFirstPage}>{t("pagination.first")}</li>
                <li className={"page-navigate"} onClick={setPreviousPage}>{t("pagination.prev")}</li>
                {productsPageable?.totalPages <= 15 ? (
                    pagination?.map((value, index) => (
                        <li className={"page-button"} id={"page-button" + value}
                            key={index} onClick={() => handlePageClick(value)}>
                            {value + 1}
                        </li>
                    ))
                ) : (
                    <>
                        {pagination?.slice(currentPage -3, currentPage).map((value, index) => (
                            <li className={"page-button"} id={"page-button" + value} key={index}
                                onClick={() => handlePageClick(value)}>
                                {value + 1}
                            </li>
                        ))}
                        <li>...</li>
                        {pagination?.slice(currentPage, currentPage +3).map((value, index) => (
                            <li className={"page-button"} id={"page-button" + value} key={index}
                                onClick={() => handlePageClick(value)}>
                                {value + 1}
                            </li>
                        ))}
                    </>
                )}
                <li className={"page-navigate"} onClick={setNextPage}>{t("pagination.next")}</li>
                <li className={"page-navigate"} onClick={setLastPage}>{t("pagination.last")}</li>
            </div>
        </div>
    );
}

export default Pagination;