import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@shared': path.resolve(__dirname, 'src/shared'),
            '@features': path.resolve(__dirname, 'src/features'),
            '@app': path.resolve(__dirname, 'src/app'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@entities': path.resolve(__dirname, 'src/pages'),
            "@assets": path.resolve(__dirname, 'src/assets'),
        },
    },
})
