import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';

// Wraps any route tree that requires authentication
const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;