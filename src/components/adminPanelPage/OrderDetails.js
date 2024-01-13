function OrderDetails(){
    function handleCloseButtonClick(){
        document.getElementById("admin-order-details").style.display = "none"
    }
    return(
        <div id={"admin-order-details"}>
            <p onClick={handleCloseButtonClick} className={"close-fp-button"}>x</p>
        </div>
    )
}
export default OrderDetails