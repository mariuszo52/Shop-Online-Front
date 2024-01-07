import {useDeleteConfirm} from "../context/DeleteConfirmContext";

function DeleteConfirmComponent(){
    const {isComponentVisible, setIsComponentVisible, handleUserDeleteConfirm} = useDeleteConfirm();
    return(
        isComponentVisible && <div className={"action-confirm-container"}>
            <h1>ARE YOU SURE?</h1>
            <button onClick={handleUserDeleteConfirm}  className={"action-confirm-button"}>YES</button>
            <button onClick={() => setIsComponentVisible(false)} className={"action-confirm-button"}>NO</button>
        </div>
    )
}
export default DeleteConfirmComponent;