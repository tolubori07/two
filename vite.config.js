export default {
    moduleexports : {
        base: "/two/", // Sets the base path of the project
      
        configureServer: {
          async server({ app }) {
            app.use((ctx, next) => {
              if (ctx.url === '/projects.html') {
                ctx.url = '/projects.html';
              } else if (ctx.url === '/about.html') {
                ctx.url = '/about.html';
              }
              return next();
            });
          },
        },
      }
  }
  