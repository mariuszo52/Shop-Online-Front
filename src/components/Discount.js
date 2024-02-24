function Discount({product, classname}) {
    return (
        <>
            {product?.discount && (
                <p className={classname}>-{product?.discount}%</p>
            )}
        </>
    )
}

export default Discount