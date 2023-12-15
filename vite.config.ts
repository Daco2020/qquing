import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // cloudflare 로 배포하기 위해 빌드 출력 디렉토리를 'build'로 설정
  },
})
