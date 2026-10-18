import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Supports both Vercel (base: '/') and GitHub Pages (base: '/PortfolioWebsite/')
export default defineConfig({
  plugins: [react()],
  base: process.env.VERCEL ? '/' : (process.env.VITE_BASE_PATH || '/PortfolioWebsite/'),
})
