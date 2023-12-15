import { defineConfig } from 'vite';

   export default defineConfig({
     build: {
       rollupOptions: {
         input: {
           main: '/index.html',
           style: '/style.css',
           script: '/main.js',
         },
       },
     },
   });