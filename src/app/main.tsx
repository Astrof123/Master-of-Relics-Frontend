import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/app/styles/index.css'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store } from './store.ts';
import { initApiClient } from '@/shared/api/client.ts';


initApiClient(store);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
)
