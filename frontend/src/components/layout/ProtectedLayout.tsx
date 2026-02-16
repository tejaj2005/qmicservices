import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface ProtectedLayoutProps {
    allowedRoles?: string[];
}

const ProtectedLayout = ({ allowedRoles }: ProtectedLayoutProps) => {
    const { user, token, isLoading } = useAuthStore();

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!token && !isLoading) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />; // Or forbidden page
    }

    return <Outlet />;
};

export default ProtectedLayout;
