/* eslint @typescript-eslint/no-var-requires: "off" */
const TerserPlugin = require("terser-webpack-plugin");

exports.minifyJavaScript = () => ({
  optimization: { 
    minimize: true,
    minimizer: [
      new TerserPlugin({

        terserOptions: {
          sourceMap: false,
          // mangle: false, // Note `mangle.properties` is `false` by default.
          mangle: {
             keep_fnames : true,
            // keep_classnames: true,
          }, // Note `mangle.properties` is `false` by default.
        },
        // minify: (file, sourceMap) => {
        //   // https://github.com/mishoo/UglifyJS2#minify-options
        //   const uglifyJsOptions = {
        //     /* your `uglify-js` package options */
        //   };

        //   if (sourceMap) {
        //     uglifyJsOptions.sourceMap = {
        //       content: sourceMap,
        //     };
        //   }

        //   return require('uglify-js').minify(file, uglifyJsOptions);
        // },

        minify: TerserPlugin.swcMinify,
        
      }),
    ],
  },

  stats: {
    // Display bailout reasons
    optimizationBailout: true,
  },

});