function Discount({product, classname}) {
    return (
        <p className={classname}>-{product?.discount}%</p>
    )
}

export default Discount