import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

const isWeb = process.env.BUILD_MODE === 'web';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), dts({
    include: ['src'],
    rollupTypes: true
  })],
  build: {
    lib: isWeb ? undefined : {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    cssCodeSplit: true
  }
})
