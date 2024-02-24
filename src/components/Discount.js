function Discount({product}) {
    return (
        <p className={"discount-container"}>-{product?.discount}%</p>
    )
}

export default Discount