
import { ThreeCircles } from "react-loader-spinner";
import ProductListElement from "./ProductListElement";

function ProductList({ productsPageable, dataLoading }) {


    return (
        <div className={"products-div"}>
            {!dataLoading ? (
                <ul className={"products-list"}>
                  <ProductListElement products={productsPageable.content}/>
                </ul>
            ) : (
                <ul className={"products-list"}>
                    <ThreeCircles color="#00BFFF" height={200} width={200} />
                </ul>
            )}
            {productsPageable?.content?.length === 0 && (
                <div className={"no-products-div"}>
                    <h1>PRODUCTS NOT FOUND!</h1>
                </div>
            )}
        </div>
    );
}

export default ProductList;
