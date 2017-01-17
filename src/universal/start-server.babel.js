// Enable ES6
// (ignoring all `build` and `node_modules` folders for speed-up)
require('babel-register')({ ignore: /\/(build|node_modules)\// })

require('./start-server.js')
