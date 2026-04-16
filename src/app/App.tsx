import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthLayout } from './router/AuthLayout';
import { SocketLayout } from './router/SocketLayout';
import { LobbyLayout } from './router/LobbyLayout';
import { ProtectedRoute } from './router/ProtectedRoute';
import CollectionPage from '@/pages/collection-page/CollectionPage';
import LoadingPage from '@/pages/LoadingPage';


const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
const MainPage = lazy(() => import('@/pages/main-page/MainPage'));
const CreateLobbyPage = lazy(() => import("@/pages/CreateLobbyPage"));
const LobbyPage = lazy(() => import("@/pages/LobbyPage"));
const GamePage = lazy(() => import("@/pages/GamePage"))

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingPage />}>
                <Routes>
                    <Route element={<AuthLayout />}>
                        <Route element={<ProtectedRoute />}>
                            <Route element={<SocketLayout /> } >
                                <Route element={<LobbyLayout /> } >
                                    <Route path="/" element={<MainPage />} />
                                    <Route path="/create" element={<CreateLobbyPage />} />
                                    <Route path="/my-lobby" element={<LobbyPage />} />
                                    <Route path="/collection" element={<CollectionPage />} />   
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
    );
}

export default App;