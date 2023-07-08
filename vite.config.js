import { defineConfig } from 'vite';

   export default defineConfig({
     build: {
       rollupOptions: {
         input: {
           main2: '/main2.js',
           about: '/about.html',
           contact: 'style2.css',
           main: '/index.html',
           style: '/style.css',
           script: '/main.js',
         },
       },
     },
   });