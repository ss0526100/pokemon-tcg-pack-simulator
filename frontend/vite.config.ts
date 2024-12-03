import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
    tsconfigPaths(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        secondary: 'en-index.html', // 두 번째 index 파일
      },
    },
  },
});
