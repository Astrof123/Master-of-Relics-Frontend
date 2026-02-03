import { Navigate, useLocation } from 'react-router-dom';
import { useAuthCheck } from '@/features/auth/hooks/useAuthCheck';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    redirectTo?: string;
    showLoader?: boolean;
}

export const ProtectedRoute = ({
    children,
    requireAuth = true,
    redirectTo = '/login'
}: ProtectedRouteProps) => {
    const location = useLocation();
    const { isAuthenticated, isLoading } = useAuthCheck();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1>Загрузка...</h1>
            </div>
        );
    }

    if (requireAuth && !isAuthenticated) {
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    if (!requireAuth && isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};