"use strict";
// server.js
exports.__esModule = true;
var routes = require('next-routes');
var next = require("next");
var app = next({ dev: process.env.NODE_ENV !== 'production' });
var handler = routes()
    .add("about", "/about", "blog")
    .add("asd", "/asd", "blog")
    .getRequestHandler(app);
var express = require('express');
app.prepare().then(function () {
    var server = express();
    server
        .use(handler)
        .listen(3000);
});
