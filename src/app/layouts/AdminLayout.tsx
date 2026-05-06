import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useEffect } from 'react';

export const AdminLayout = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.isAdmin) {
            navigate("/");
        }
    }, [])


    return (
        <Outlet />
    );
};