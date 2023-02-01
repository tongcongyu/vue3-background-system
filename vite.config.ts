/*
 * @Author: H3C\tys4483 YS.tongcongyu@h3c.com
 * @Date: 2023-01-18 10:36:06
 * @LastEditors: H3C\tys4483 YS.tongcongyu@h3c.com
 * @LastEditTime: 2023-01-31 10:15:21
 * @FilePath: \vue3-background-system\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite';
import { resolve } from 'path'; //路径依赖
import postcssPxToViewport from 'postcss-px-to-viewport'; //屏幕适配依赖
import { viteMockServe } from 'vite-plugin-mock'; //mock数据插件
import AutoImport from 'unplugin-auto-import/vite';
import vue from '@vitejs/plugin-vue';
const pathResolve = (dir: string) => resolve(__dirname, dir); //__dirname安装 @types/node

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe(),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: [
        // 插件预设支持导入的api
        'vue',
        'vue-router',
        // 自定义导入的api
      ],
      eslintrc: {
        enabled: false, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      dts: './auto-imports.d.ts',
    }),
  ],
  base: './', // 设置打包路径,公共基础路径 base
  build: {
    outDir: 'dist', // 打包文件的输出目录
    terserOptions: {
      compress: {
        keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
        drop_console: true, // 生产环境去除 console
        drop_debugger: true, // 生产环境去除 debugger
      },
    },
    chunkSizeWarningLimit: 1500, // chunk 大小警告的限制（以 kbs 为单位）
  },
  resolve: {
    // 定义路径别名
    alias: {
      '@': pathResolve('./src'), // 设置 `@` 指向 `src` 目录
      views: pathResolve('./src/views'),
      components: pathResolve('./src/components'),
      assets: pathResolve('./src/assets'),
    },
    extensions: ['.js', '.ts', '.json'], // 导入时想要省略的扩展名列表，不要省略.vue
  },
  optimizeDeps: {
    force: true, // 强制进行依赖预构建，在对依赖有修改的情况下，不使用缓存
  },
  // CSS 预处理器的配置选项
  css: {
    //
    preprocessorOptions: {
      scss: {
        additionalData: `$injectedColor: orange;`, // 在scss中定义全局变量
        // cssFileData: `@import '/src/assets/styles/variables.scss'`, // 引入全局变量文件
      },
    },
    // 屏幕适配
    postcss: {
      plugins: [
        // viewport 布局适配,px 单位自动转为 vw 或 vh
        postcssPxToViewport({
          viewportWidth: 1920, //设置屏幕宽度
        }),
      ],
    },
  },
  server: {
    port: 8088, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域

    // 设置代理，根据我们项目实际情况配置,就是将127.0.0.1:8080/api的请求 url 替换成127.0.0.1:8000，
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace('/api/', '/')
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
