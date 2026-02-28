import { useAuthCheck } from '@/features/auth/hooks/useAuthCheck';
import { Outlet, useNavigate } from 'react-router-dom';


export const ProtectedRoute = () => {
    const { isAuthenticated } = useAuthCheck();

    const navigate = useNavigate();

    if (!isAuthenticated) {
        navigate("/login")
    }

    return (
        <>
            <Outlet />
        </>
    )
};