import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/website/info': 'https://api.codelife.cc/',
      '/wallpaper/random': 'https://api.codelife.cc/',
      '^/user': 'http://115.171.251.216:8090',
      '^/file': 'http://115.171.251.216:8090',

    }
  },
  plugins: [vue()],
})
