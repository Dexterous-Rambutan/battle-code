// webpack.config.js exports a configuration object in the CommonJS pattern.
module.exports = {

  // `entry` gives a path to the file that is the "root" of the dependency
  // tree, since Webpack walks through your files and builds a bundle by
  // reading `require` statements in each of them. So think of `entry` as
  // the top-level file that then `requires` some other files, which then
  // `require` some other files, etc. Webpack pulls these all into a modularized
  // bundle.
  entry: './app/index.js',

  // `output` is an object with options for the bundle that Webpack creates
  // out of your source files.
  output: {

    // `path` is a path to the directory where your bundle will be written.
    path: 'server/public',

    // `publicPath` is optional. It allows you to set a separate path that will
    // be used by any lazy-loading in your Webpack scripts to load more chunks
    // from the server. Basically, `path` sets where in your project's file structure
    // your bundle will be written, while `publicPath` tells your Webpack modules
    // where your bundle can be requested from the server. In this repo, `publicPath`
    // tells the webpack-dev-server that it's ok to serve the files in the dist folder.
    publicPath: 'public',

    // `filename` tells Webpack what to call the file/files it outputs.
    filename: 'bundle.js',
  },

  // `module` is an object with options for how Webpack processes the files it loads
  // when it scans a `require` statement. 99% of the time, `loaders` will be the only
  // thing you specify inside of `module`.
  module: {

    // `loaders` lets you plug in programs that will transform your source files
    // when Webpack loads them with a `require` statement. A lot of the magic of
    // Webpack is done using loaders. In this example, there's one loader declared
    // to use Babel to transform ES6 and JSX into ES5.
    //
    // `loaders` is an array of objects.
    loaders: [
      {
        // `test` is a test condition that causes the loader to be applied when a
        // filename passes. In this case, when any filename contains either `.js` or `.jsx`
        // as its terminating characters, this loader will be applied.
        test: /\.jsx?$/,

        // `exclude` lets you specify tests that, when passed by a filename, cause those
        // files to *not* be transformed by the loader. There's also an `include` option
        // that works in the inverse way.
        exclude: /(node_modules|bower_components)/,

        // `loader` names the actual loader that is to be applied. In this case,
        // this object requires 'babel-loader' to do the transformation.
        // We could actually apply multiple loaders here by using the property `loaders`
        // instead of `loader`, which takes an array of loader names.
        //
        // When you're declaring loaders in this field, you can leave off the `-loader` part
        // of the package name. Webpack will interpret `babel` as `babel-loader` here,
        // `coffee` as `coffee-loader`, etc. But you can also just write out `babel-loader`,
        // if you prefer.
        loader: 'babel',

        // `query` lets you pass options to the loader's process. The options that a loader takes
        // are specific to each loader. In this case, `babel-loader` is being told to use the 'react'
        // and 'es2015' presets when it transforms files. `query` becomes a query string, similar
        // to what you see in request URLs, and the same thing could be achieved by writing this above:
        // loader: 'babel?presets[]=react,presets[]=es2015'
        query: {
          presets: ['react', 'es2015'],
        }
      },
    ]
  }

};
