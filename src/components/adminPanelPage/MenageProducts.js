import Pagination from "../Pagination";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNotification} from "../../context/NotificationContext";
import {useDeleteConfirm} from "../../context/DeleteConfirmContext";
import {useTranslation} from "react-i18next";
import {useTranslate} from "../../context/TranslateContext";

function MenageProducts({
                            pagination, setIsElementClicked, showElementEditor,
                            closeForm, calculatePageNumbers, onDeleteButtonClick
                        }) {
    const [products, setProducts] = useState(null)
    const [page, setPage] = useState(0)
    const {setNotificationVisible, setNotificationText} = useNotification()
    const {index} = useDeleteConfirm();
    const {t} = useTranslation()
    const {translate} = useTranslate()


    useEffect(() => {
        function fetchAllProducts() {
            const params = {
                page: page
            }
            axios.get(process.env.REACT_APP_SERVER_URL + "/admin/product-management/all-products", {params})
                .then(response => {
                    setProducts(response.data)
                    calculatePageNumbers(response.data)
                })
                .catch(reason => console.log(reason))
        }

        fetchAllProducts()
    }, [page, index]);

    function onSearchFormSubmit(event) {
        event.preventDefault()
        const params = {
            searchBy: event.target?.querySelector("select")?.value,
            value: event.target?.querySelector("input")?.value
        }
        axios.get(process.env.REACT_APP_SERVER_URL + "/admin/product-management/product", {params})
            .then(response => setProducts({content: new Array(response.data)}))
            .catch(reason => {
                console.log(reason)
                setNotificationText(t("productsNotFound"))
                setNotificationVisible()
            })
    }

    function updateProductField(event, fieldName, productId, index) {
        let url;
        let value;
        let span = document.getElementById("edit-span-" + fieldName + index)
        let form = document.getElementById("edit-form-" + fieldName + index);
        switch (fieldName) {
            case "name":
                url = process.env.REACT_APP_SERVER_URL + "/admin/product-management/name"
                value = event.target.querySelector("input")?.value
                break
            case "price":
                url = process.env.REACT_APP_SERVER_URL + "/admin/product-management/price"
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
            .catch(err => {
                translate(err.response.data)
                    .then(translation => {
                        setNotificationText(translation)
                        setNotificationVisible(true)
                    })
                    .catch(translationErr => console.log(translationErr))
                console.log(err)
            })
    }

    function onUpdateSubmit(event, name, id, index) {
        event.preventDefault()
        updateProductField(event, name, id, index)
        setIsElementClicked(false)
    }

    return (
        <div className={"menu-my-account"}>
            <h1>{t("productsList")}</h1>
            <form
                onSubmit={event => onSearchFormSubmit(event)}
                className={"admin-panel-search-form"}>
                <input
                    required={true}
                    type={"text"}/>
                <select>
                    <option value={"id"}>ID</option>
                    <option value={"name"}>{t("name")}</option>
                </select>
                <button type={"submit"}>{t("search")}</button>
            </form>
            <table className={"manage-products-table"}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>{t("name")}</th>
                    <th>{t("price")}</th>
                    <th>{t("options")}</th>
                </tr>
                </thead>
                <tbody>
                {products?.content?.map((product, index) => (
                    <tr key={index}>
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
                        <td onClick={() => onDeleteButtonClick(product?.id, "productId")}>{t("delete")}</td>
                    </tr>
                ))}
                </tbody>
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