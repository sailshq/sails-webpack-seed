# sails-webpack-seed

a [Sails](http://sailsjs.com) 1.0 application utilizing the Webpack 2.x asset bundler.

This app is the result of running `sails new --without grunt` and then adding some files, dependencies and configuration to facilitate a basic Webpack asset pipeline.

> This is just an example of how you can set up your Sails app to work with Webpack.  Refer to the [Webpack documentation](https://webpack.js.org/configuration/) for a full guide to Webpack usage and configuration!

### Areas of interest

You&rsquo;ll want to pay attention to the following files when tweaking this app to fit your specific needs:

* `config/webpack.js`:  this contains the main Webpack configuration, which is used by a hook in the app to initialize a new Webpack 2.x compiler.  See the [full Webpack configuration docs](https://webpack.js.org/configuration/) for info about all of the available options.
* `config/env/production.js`:  the default Sails.js production config file has been updated to include a section that adds the `UglifyJsPlugin` plugin to the Webpack config when in production mode.
* `api/hooks/webpack`:  a simple [hook](http://sailsjs.com/documentation/concepts/extending-sails/hooks) that starts a Webpack compiler when your Sails app lifts.  In most cases you shouldn&rsquo;t have to modify the hook at all.
* `assets/js/sockets.js`:  rather than including the [Sails socket client](http://sailsjs.com/documentation/reference/web-sockets/socket-client) using a `<script>` tag, we want to do it the Webpack way by `require()`ing the file in one of our scripts.  Webpack&rsquo;s dependency cacheing causes some problems with the socket client&rsquo;s initialization, so we wrap the initialization step in the `sockets.js` file.  Any script that needs to use the socket client can do so by adding `var io = require('/relative/path/to/sockets.js')` at the top.
   > Note that this means that `io.socket` will _not_ be available globally -- for example, if you open up a JavaScript console in your browser, you won&rsquo;t be able to do `io.socket.get()` to try out a request.  To make the socket client available globally, you&rsquo;ll have to manually set `window.io` in a JavaScript file.
* `views/layout.ejs` and `views/homepage.ejs`:  these have been adjusted to load the bundled scripts and stylesheets created by Webpack, rather than the individual .js and .css files that usually get copied directly from `assets` into `.tmp/public`.

### What happens when you lift

When you lift this seed app, the app-level `webpack` hook starts a new Webpack compiler which then:

1. Cleans out the `.tmp/public` folder (using the `CleanWebpackPlugin` plugin)
2. Copies over any files from `assets/images` and `assets/fonts` into `.tmp/public` (using the `CopyWebpackPlugin` plugin)
3. Loads the `assets/js/homepage.js` file
4. Imports the `assets/styles/homepage.less` and `assets/dependencies/sockets.js` files via the `require()` statements in the `homepage.js` file.
5. Recursively processes any requires in those files, and combines all of the JavaScript into one file (.tmp/public/js/homepage.bundle.js) and all of the CSS into another (.tmp/public/styles/homepage.bundle.css), using the `ExtractTextPlugin` plugin.  _In the production environment, the JavaScript is minified using the `UglifyJsPlugin` plugin.
6. Starts watching `homepage.js` and any of it dependencies for changes, as well as changes/additions to files in `assets/images` and `assets/fonts`.

### Where to go from there

The sky&rsquo;s the limit!  If this starter configuration works for you, and you&rsquo; building a multi-page app, you'll probably want to add items in the `sails.config.webpack.entry` dictionary for each page you build.  You may also want to adjust the `CopyWebpackPlugin` to add or remove asset folders to copy wholesale into `.tmp/public`.

### Links

+ [Webpack main site](http://webpack.js.org)
+ [Sails framework documentation](http://sailsjs.com/documentation)
+ [Version notes / upgrading](http://sailsjs.com/documentation/upgrading/to-v-1-0)
+ [Deployment tips](http://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](http://sailsjs.com/support)
+ [Sails Flagship](https://flagship.sailsjs.com)
