import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default ({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));

  return defineConfig({
    plugins: [react()],
    build: {
      outDir: '../backend/public',
      emptyOutDir: true,
    },
    server: {
      allowedHosts: [process.env.VITE_ALLOWED_HOST as string],
    }
  });
}
