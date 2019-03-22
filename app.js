"use strict";

const express = require("express");
const app = express();
const router = express.Router();
const TaskRoute = require("./app/routes/task.route");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const https = require("https");
const SSERoute = require("./app/routes/sse.route");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());
app.use("*", cors());
// app.use(_cors);

// middleware that is specific to this router
router.use((req, res, next) => {
    const now = new Date();
    console.log("> new", req.method, "request at", now.toLocaleString());
    next();
});

app.use("/api/v1", router);
new TaskRoute(router).registerRoute();
new SSERoute(router).registerRoute();

https.createServer({
    key: fs.readFileSync("certificates/todo-server.fabnum.intradef.gouv.fr.key"),
    cert: fs.readFileSync("certificates/todo-server.fabnum.intradef.gouv.fr.crt")
}, app).listen(8443, () => {
    console.log("Neon app - Listening on port 8443!");
});

// vvv - Prints available methods - vvv

// function print(path, layer) {
//     if (layer.route) {
//         layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))));
//     } else if (layer.name === "router" && layer.handle.stack) {
//         layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))));
//     } else if (layer.method) {
//         console.log("%s /%s",
//             layer.method.toUpperCase(),
//             path.concat(split(layer.regexp)).filter(Boolean).join("/"));
//     }
// }

// function split(thing) {
//     if (typeof thing === "string") {
//         return thing.split("/");
//     } else if (thing.fast_slash) {
//         return "";
//     }
//     const match = thing.toString()
//         .replace("\\/?", "")
//         .replace("(?=\\/|$)", "$")
//         .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);

//     return match ? match[1].replace(/\\(.)/g, "$1").split("/") : `<complex:${thing.toString()}>`;

// }

// app._router.stack.forEach(print.bind(null, []));
