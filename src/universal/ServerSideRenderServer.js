// express.js
import path from 'path'
import http from 'http'
import express from 'express'
import http_proxy from 'http-proxy'

import React from 'react'
import ReactDOM from 'react-dom/server'
// react-router
import { match, RouterContext } from 'react-router'

import UniversalAppContainer from '../containers/UniversalAppContainer'

// Redux
import createStore from '../store/createStore'
const initialState = {}
const store = createStore(initialState)
const routes = require('../routes/index').default(store)


// The server code must export a function
// (`parameters` may contain some miscellaneous library-specific stuff)
export default function(parameters)
{
    // Create HTTP server
    const app = new express()
    const server = new http.Server(app)

    // Serve static files
    app.use(express.static(path.join(__dirname, '..', 'dist')))

    // React application rendering
    app.use((req, res) =>
    {
      match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
          res.status(500).send(error.message)
        } else if (redirectLocation) {
          res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
          // You can also check renderProps.components or renderProps.routes for
          // your "not found" component or route respectively, and send a 404 as
          // below, if you're using a catch-all route.
          const assets= parameters.chunks()
          res.status(200).send(
                `<!doctype html>
                <html>
                    <header>
                      <title>React Redux Starter Kit</title>
                      <meta charset="utf-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1">
                      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
                    </header>
                    <body>
                      <div id='root' style='height:100%;'>
                        ${ReactDOM.renderToString(<UniversalAppContainer store={store} {...renderProps} createElement={React.createElement}/>)}
                      </div>
                      <script src='${assets.javascript.vendor}' charSet="UTF-8"></script>
                      <script src='${assets.javascript.app}' charSet="UTF-8"></script>
                    </body>
                </html>`
          )
        } else {
          res.status(404).send('Not found')
        }
      })
    })

    // Start the HTTP server
    server.listen(3001,  (error) => {
        if (error) {
            console.log('Webpage rendering server shutdown due to an error', error);
            throw error;
        }

        console.log(`Webpage server is listening at http://localhost:3001`);
    });
}
