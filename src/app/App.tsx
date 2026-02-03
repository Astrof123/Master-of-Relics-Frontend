import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/app/ProtectedRoute';


// const LoginPage = lazy(() => import('@/pages/LoginPage'));
// const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
// const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
// const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
// const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
// const Layout = lazy(() => import('@/app/layouts/MainLayout'));

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/login" element={
                    <ProtectedRoute requireAuth={false}>
                        <LoginPage />
                    </ProtectedRoute>
                } />
                <Route path="/register" element={
                    <ProtectedRoute requireAuth={false}>
                        <RegisterPage />
                    </ProtectedRoute>
                } /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;