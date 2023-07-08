import { defineConfig } from 'vite';

   export default defineConfig({
     build: {
       rollupOptions: {
         input: {
           main: '/main2.js',
           about: '/about.html',
           contact: 'style2.css',
         },
       },
     },
   });