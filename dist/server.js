"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const logger = require("morgan");
const index_1 = require("./models/index");
const routes_1 = require("./routes");
const migrate_1 = require("./db/migrate");
const rootRouter = express.Router();
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.status(200).send({ message: 'Welcome to the beginning of nothingness.' });
});
migrate_1.default();
index_1.default.sync({ force: false });
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
routes_1.default(rootRouter);
app.use('/', rootRouter);
const port = process.env.PORT || 3000;
app.set('port', port);
const server = app.listen(port, function () {
    console.log("Server is running on ", port, app.settings.env);
});
server.listen(port);
console.info("Server is running on port: " + port);
