// Vite yapılandırma dosyası
// Bu dosya, Vite build tool'unun nasıl çalışacağını belirler
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // React plugin'ini etkinleştirir
})




