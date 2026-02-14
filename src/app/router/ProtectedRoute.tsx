import { Navigate } from 'react-router-dom';
import { useAuthCheck } from '@/features/auth/hooks/useAuthCheck';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    redirectTo?: string;
    showLoader?: boolean;
}

export const ProtectedRoute = ({
    children,
    requireAuth = true
}: ProtectedRouteProps) => {
    const { isAuthenticated, isChecking } = useAuthCheck();

    if (isChecking) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (requireAuth && !isAuthenticated) {
        return <Navigate to={'/login'}/>;
    }

    return <>{children}</>;
};