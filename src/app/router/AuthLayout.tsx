import { Outlet } from 'react-router-dom';
import { useAuthCheck } from '@/features/auth/hooks/useAuthCheck';

export const AuthLayout = () => {
    const { isChecking } = useAuthCheck();

    if (isChecking) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <Outlet />
    );
};