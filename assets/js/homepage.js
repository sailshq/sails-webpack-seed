// Require the styles for this page.  This will cause the `homepage.bundle.css` file
// to be generated.  Note that you can require multiple .less or .css files here, and
// they will _all_ be bundled together into `homepage.bundle.css` (the name is based
// on the name of this JavaScript file).
require('../styles/homepage.less');

// Require the sockets.js file if you want to be able to use the socket client to
// do things like `io.socket.get()` inside of this script.
var io = require('../dependencies/sockets.js');

// To make the socket client available globally, uncomment the next line:
// window.io = io;

// Make the sun rise.
setTimeout(function sunrise () {
  document.getElementsByClassName('header')[0].style.backgroundColor = '#118798';
}, 0);
