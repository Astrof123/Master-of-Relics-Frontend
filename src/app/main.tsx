import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import '@/app/styles/index.css'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store } from './store.ts';
import { initApiClient } from '@/shared/api/client.ts';
import CardModalManager from '@/features/modal/components/card-modal-manager/CardModalManager.tsx';
import GeneralModalManager from '@/features/modal/components/general-modal-manager/GeneralModalManager.tsx';

initApiClient(store);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <App />
            <CardModalManager />
            <GeneralModalManager />
        </Provider>
    </StrictMode>,
)
