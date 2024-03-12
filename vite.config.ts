import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  // 路径设置
  base: "./",
  resolve: {
    // 配置路径别名
    alias: [
      {
        // 配置 @ 指代 src
        find: "@",
        replacement: resolve(__dirname, "./src")
      }
    ]
  },
  // 插件
  plugins: [vue()],
})
