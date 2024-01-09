import Pagination from "../Pagination";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNotification} from "../../context/NotificationContext";

function MenageProducts({pagination, setIsElementClicked, showElementEditor, closeForm, calculatePageNumbers}) {
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(0)
    const {setNotificationVisible, setNotificationText} = useNotification()

    useEffect(() => {
        function fetchAllProducts() {
            const params = {
                page: page
            }
            axios.get("http://localhost:8080/product-management/all-products", {params})
                .then(response => setProducts(response.data))
                .catch(reason => console.log(reason))
        }

        fetchAllProducts()
    }, [page]);

    function onSearchFormSubmit(event) {

    }
    function updateProductField(event, fieldName, productId, index) {
        let url;
        let value;
        let span = document.getElementById("edit-span-" + fieldName + index)
        let form = document.getElementById("edit-form-" + fieldName + index);
        switch (fieldName) {
            case "name":
                url = "http://localhost:8080/product-management/name"
                value = event.target.querySelector("input")?.value
                break
            case "price":
                url = "http://localhost:8080/product-management/price"
                value = event.target.querySelector("input")?.value
                break
        }
        let data = {
            productId: productId,
            [fieldName]: value
        }
        axios.put(url, data)
            .then(response => {
                span.innerText = value;
                span.style.display = "flex"
                form.style.display = "none"
                setIsElementClicked(false)
            })
            .catch(reason => {
                setNotificationText(reason.response.data)
                setNotificationVisible(true)
                closeForm(form, span)
                console.log(reason)
            })
    }

    function onUpdateSubmit(event, name, id, index) {
        event.preventDefault()
        updateProductField(event, name, id, index)
        setIsElementClicked(false)
    }

    function handleOnDeleteButtonClick(id) {

    }


    return (
        <div className={"menu-my-account"}>
            <h1>PRODUCTS LIST</h1>
            <form
                onSubmit={event => onSearchFormSubmit(event)}
                className={"admin-panel-search-form"}>
                <input
                    required={true}
                    type={"text"}/>
                <select>
                    <option value={"id"}>ID</option>
                    <option value={"name"}>NAME</option>
                </select>
                <button type={"submit"}>SEARCH</button>
            </form>
            <table className={"manage-products-table"}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>OPTIONS</th>
                </tr>
                </thead>
                {products?.content?.map((product, index) => (
                    <tbody key={index}>
                    <tr>
                        <td>{product?.id}</td>
                        <td
                            className={"name"}
                            onClick={event =>
                                showElementEditor(index, "name", "input")}
                        >
                            <form
                                onSubmit={event =>
                                    onUpdateSubmit(event, "name", product?.id, index)}
                                id={"edit-form-name" + index}
                                className={"edit-products-form"}>
                                <input
                                    required={true}
                                />
                            </form>
                            <span id={"edit-span-name" + index}>{product?.name}</span></td>
                        <td
                            className={"price"}
                            onClick={(event) =>
                                showElementEditor(index, "price", "input")}>
                            <form
                                onSubmit={event =>
                                    onUpdateSubmit(event, "price", product?.id, index)}
                                id={"edit-form-price" + index}
                                className={"edit-products-form"}>
                                <input
                                    type={"number"}
                                    step={"0.01"}
                                    required={true}
                                />
                            </form>
                            <span id={"edit-span-price" + index}>{product?.price}</span></td>
                        <td onClick={() => handleOnDeleteButtonClick(product?.id)}>DELETE</td>
                    </tr>
                    </tbody>
                ))}
            </table>
            <Pagination
                productsPageable={products}
                pagination={pagination}
                currentPage={page}
                setCurrentPage={setPage}
                currentSize={50}
            />
        </div>
    )
}

export default MenageProducts