import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthLayout } from './layouts/AuthLayout';
import { SocketLayout } from './layouts/SocketLayout';
import { LobbyLayout } from './layouts/LobbyLayout';
import { ProtectedRoute } from './layouts/ProtectedRoute';
import CollectionPage from '@/pages/collection-page/CollectionPage';
import LoadingPage from '@/pages/LoadingPage';
import ProfilePage from '@/pages/profile-page/ProfilePage';
import ReportsPage from '@/pages/reports-page/ReportsPage';
import { AdminLayout } from './layouts/AdminLayout';
import { SidebarLayout } from './layouts/sidebar-layout/SidebarLayout';
import InviteCodesPage from '@/pages/invite-codes-page/InviteCodesPage';
import UsersPage from '@/pages/users-page/UsersPage';
import KnowledgePage from '@/pages/knowledge-page/KnowledgePage';
import "sonner/dist/styles.css";

const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
const MainPage = lazy(() => import('@/pages/main-page/MainPage'));
const CreateLobbyPage = lazy(() => import("@/pages/CreateLobbyPage"));
const LobbyPage = lazy(() => import("@/pages/LobbyPage"));
const GamePage = lazy(() => import("@/pages/GamePage"))
import { Toaster } from 'sonner';

function App() {
    return (
        <>
            <BrowserRouter>
                <Suspense fallback={<LoadingPage />}>
                    <Routes>
                        <Route element={<AuthLayout />}>
                            <Route element={<ProtectedRoute />}>
                                <Route element={<SocketLayout /> } >
                                    <Route element={<LobbyLayout /> } >
                                        <Route element={<SidebarLayout /> } >
                                            <Route path="/" element={<MainPage />} />
                                            <Route path="/admin/reports" element={<ReportsPage />} /> 
                                            <Route path="/create" element={<CreateLobbyPage />} />
                                            <Route path="/my-lobby" element={<LobbyPage />} />
                                            <Route path="/collection" element={<CollectionPage />} />
                                            <Route path="/knowledge" element={<KnowledgePage />} />
                                            <Route path="/profile/:id" element={<ProfilePage />} />
                                            <Route element={<AdminLayout /> } >
                                                <Route path="/admin/reports" element={<ReportsPage />} />
                                                <Route path="/admin/invite-codes" element={<InviteCodesPage />} />
                                                <Route path="/admin/users" element={<UsersPage />} /> 
                                            </Route>
                                        </Route>
                                    </Route>
                                    <Route path="/game/:id" element={<GamePage />} />
                                </Route>                        
                            </Route>
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/login" element={<LoginPage />} />
                        </Route>
                    </Routes>
                </Suspense>

            </BrowserRouter>        
            <Toaster
                position="top-right"
                richColors
                toastOptions={{
                    style: {
                        background: "linear-gradient(145deg, #2a2220 0%, #1a1518 100%)",
                        border: "2px solid #5d4a36",
                        borderRadius: "8px",
                        color: "#e8d9c0",
                        fontFamily: "'Forum', serif",
                        userSelect: "none",
                        fontWeight: "700",
                        fontSize: "16px",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.8), 0 0 0 1px #8b6f4c inset",
                    },
                }}
            />
        </>

    );
}

export default App;