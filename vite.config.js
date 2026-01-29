import { defineConfig } from 'vite'

export default defineConfig({
    // Minimal Vite config for static site
    build: {
        outDir: 'dist',
        assetsDir: 'assets'
    }
})
