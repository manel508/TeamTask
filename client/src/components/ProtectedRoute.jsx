import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children, role }) {
    const { user } = useSelector((state) => state.auth);
    if (!user) return <Navigate to="/" />;
    if (role && user.role !== role) return <Navigate to="/dashboard" />;
    return children;
}

export default ProtectedRoute;
