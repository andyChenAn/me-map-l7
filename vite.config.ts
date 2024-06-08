import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve : {
    alias : {
      "@" :  resolve(__dirname , './src')
    }
  },
  build: {
    outDir: "me-map-l7",
    lib: {
      entry: 'src/me-map-l7/index.ts',
      name: 'me-map-l7',
      fileName: 'me-map-l7',
      formats: ['es' , 'umd', 'cjs'],
    },
    rollupOptions: {
      external: ['vue' , '@antv/l7' , '@antv/l7-maps'],
      output: {
        globals: {
          vue: 'Vue',
          '@antv/l7' : 'L7',
          '@antv/l7-maps' : 'L7-Map'
        }
      }
    }
  },
})
