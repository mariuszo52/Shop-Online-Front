import {useDeleteConfirm} from "../context/DeleteConfirmContext";
import {useTranslation} from "react-i18next";

function DeleteConfirmComponent(){
    const {t} = useTranslation()
    const {isComponentVisible, setIsComponentVisible, handleUserDeleteConfirm} = useDeleteConfirm();
    return(
        isComponentVisible && <div className={"action-confirm-container"}>
            <h1>{t("sure")}</h1>
            <button onClick={handleUserDeleteConfirm}  className={"action-confirm-button"}>{t("yes")}</button>
            <button onClick={() => setIsComponentVisible(false)} className={"action-confirm-button"}>{t("no")}</button>
        </div>
    )
}
export default DeleteConfirmComponent;