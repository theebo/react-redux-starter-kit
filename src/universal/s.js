import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import path from 'path';
import {Provider} from 'react-redux';
import {ServerRouter, createServerRenderContext} from 'react-router';

import http from 'http';
// import compression from 'compression';
// import slash from 'express-slash';

import createStore from '../store/createStore.js';

import Html from './html';
//import Wrapper from '../wrapper';

export default function (parameters) {
    const app = new Express();

    app.use('/', Express.static(path.join(__dirname, '..', 'dist')));

    const server = new http.Server(app);


    const chunks = parameters.chunks();

    app.use((req, res) => {
        const hydrateOnClient = () => {
            res.send(
                `<!doctype html>\n${ReactDOM.renderToString(<Html assets={chunks} />)}`
            );
        };

        const context = createServerRenderContext();
        const result = context.getResult();

	const initialState = {}
	const store = createStore(initialState)

        global._env = {};

        if (false) {
            hydrateOnClient();
            return;
        }

        const component = (
            <Provider store={store}>
                <ServerRouter
                    location={req.url}
                    context={context}
                >
                </ServerRouter>
            </Provider>
        );

        const content = ReactDOM.renderToString(
            <Html
                assets={chunks}
                component={component}
                store={store}
            />
        );

        if (result.missed) {
            res.status(404);
        } else {
            res.status(200);
        }


        res.send(`<!doctype html>\n${content}`);
    });

    server.listen(3000, (error) => {
        if (error) {
            console.log(error)
            throw error;
        }

        console.log(`Webpage server is listening at http://localhost:3000`);
    });
}
