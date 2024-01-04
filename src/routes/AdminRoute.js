import {Navigate} from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

export function AdminRoute({children}) {

    if (!sessionStorage.getItem("jwt")) {
        return <Navigate to="/account/login"/>;
    }
    else if (jwtDecode(sessionStorage.getItem("jwt"))?.role === "ADMIN" ){
        return children
    }
    else{
        return<Navigate to={"/"}/>
    }
    }