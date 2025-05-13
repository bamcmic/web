import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [plugin()],
    server: {
      host: '0.0.0.0', // 监听所有网络接口
      port: 3000,
      strictPort: true // 如果端口被占用则报错
    },
    resolve: {
        alias: {
          '@assets': path.resolve(__dirname, 'src/assets'),
        },
      }
})