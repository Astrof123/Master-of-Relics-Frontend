import { Outlet } from 'react-router-dom';
import { ProtectedRoute } from '@/app/router/ProtectedRoute';

export const AuthLayout = () => {
    

    return (
        <ProtectedRoute requireAuth={true}>
            <Outlet />
        </ProtectedRoute>
    );
};