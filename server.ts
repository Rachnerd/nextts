// server.js

const routes = require('next-routes');
import * as next from 'next';

const app = next({dev: process.env.NODE_ENV !== 'production'})

const handler = (routes as any)()
    .add("about", "/about", "blog")
    .add("asd", "/asd", "blog")
    .getRequestHandler(app);

const express = require('express');

app.prepare().then(() => {
    const server = express();
    server
        .use(handler)
        .listen(3000);
});
