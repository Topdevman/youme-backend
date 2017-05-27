import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as http from 'http';
import * as path from 'path';
import * as passwordHash from 'password-hash';

import { User } from './models/user';
import { APIController } from './controllers/api';
import { Migrate } from './db/migrate';
import { Authenticator } from './middleware/authenticator';

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let apiController = new APIController(app);
let migrate = new Migrate();

app.get('/', (req, res, next) => {
    res.status(200).send({ message: 'Welcome to the beginning of nothingness.' });
    next();
})

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

const port = process.env.PORT || 3000;
app.set('port', port);

const server = app.listen(port, function () {
    console.log("Server is running on ", port, app.settings.env);
});
server.listen(port);