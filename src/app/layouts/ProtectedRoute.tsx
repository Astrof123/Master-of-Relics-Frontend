import { useAuthCheck } from '@/features/auth/hooks/useAuthCheck';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';


export const ProtectedRoute = () => {
    const { isAuthenticated } = useAuthCheck();

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    if (isAuthenticated === undefined) {
        return <div>Загрузка...</div>;
    }

    return (
        <>
            <Outlet />
        </>
    )

    
};