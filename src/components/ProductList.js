
import { ThreeCircles } from "react-loader-spinner";
import ProductListElement from "./ProductListElement";
import {useTranslation} from "react-i18next";

function ProductList({ productsPageable, dataLoading}) {
    const {t} = useTranslation()


    return (
        <div className={"products-div"}>
            {!dataLoading ? (
                <ul className={"products-list"}>
                  <ProductListElement
                      products={productsPageable.content}/>
                </ul>
            ) : (
                <ul className={"products-list"}>
                    <ThreeCircles color="#00BFFF" height={200} width={200} />
                </ul>
            )}
            {productsPageable?.content?.length === 0 && (
                <div className={"no-products-div"}>
                    <h1>{t("productsNotFound")}</h1>
                </div>
            )}
        </div>
    );
}

export default ProductList;
