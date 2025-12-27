import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0', // السماح بالاتصالات من أي IP (مهم لـ AWS)
    port: 5173, // البورت الافتراضي (يمكن تغييره حسب الحاجة)
    strictPort: false, // إذا كان البورت مشغول، استخدم بورت آخر
    cors: true, // تفعيل CORS للسماح بالطلبات من نطاقات مختلفة
  },
  preview: {
    host: '0.0.0.0', // للـ production preview
    port: 4173,
    strictPort: false,
    cors: true,
  },
})