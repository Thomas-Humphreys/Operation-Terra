import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  console.log("API Key loaded:", env.VITE_GREENPT_API_KEY ? "YES ✓" : "NOT FOUND ✗")
  
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: 'https://api.greenpt.ai',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq, req) => {
              proxyReq.setHeader('authorization', req.headers['authorization']);
              proxyReq.removeHeader('origin');
              proxyReq.removeHeader('referer');
            });
          }
        }
      }
    }
  }
})