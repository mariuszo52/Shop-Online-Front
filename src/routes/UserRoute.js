import { Navigate } from 'react-router-dom';

export function UserRoute({ children }) {
    if (!sessionStorage.getItem('jwt')) {
        return <Navigate to="/account/login" />;
    }
    return children;
}