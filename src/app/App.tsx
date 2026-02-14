import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthLayout } from './router/AuthLayout';
import { SocketLayout } from './router/SocketLayout';


const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
const MainPage = lazy(() => import('@/pages/MainPage'));
const CreateLobbyPage = lazy(() => import("@/pages/CreateLobbyPage"))
const LobbyPage = lazy(() => import("@/pages/LobbyPage"))

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Загрузка...</div>}>
                <Routes>
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route element={<AuthLayout />}>
                        <Route element={<SocketLayout /> } >
                            <Route path="/" element={<MainPage />} />
                            <Route path="/create" element={<CreateLobbyPage />} />
                            <Route path="/my-lobby" element={<LobbyPage />} />
                        </Route>
                    </Route>
                </Routes>
            </Suspense>

        </BrowserRouter>
    );
}

export default App;