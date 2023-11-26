import { Navigate } from 'react-router-dom';

export function LoggedRoute({ children }) {
    if (sessionStorage.getItem('jwt')) {
        return <Navigate to="/" />;
    }

    return children;
}