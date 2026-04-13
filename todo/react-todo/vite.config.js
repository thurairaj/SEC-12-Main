import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// defineConfig accepts a function so we can read env vars before the config is built.
// loadEnv reads the .env file for the current mode (development/production).
// The third argument '' means load ALL vars, not just VITE_* prefixed ones.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const PORT     = parseInt(env.PORT)     || 5173
  const API_URL  = env.API_URL            || 'http://localhost:3000'

  return {
    plugins: [react()],
    server: {
      port: PORT,
      proxy: {
        '/todos':  API_URL,
        '/health': API_URL,
      },
    },
  }
})
