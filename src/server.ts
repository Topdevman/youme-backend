import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as http from 'http';
import * as path from 'path';
import * as passport from 'passport';
import routes from './routes';
import migrate from './db/migrate';
import addHeaders from './controllers/main';

import authController = require('./controllers/auth');


const rootRouter = express.Router();

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
passport.use(authController.localStrategy);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res, next) => {
    res.status(200).send({ message: 'Welcome to the beginning of nothingness.' });
    next();
})

migrate();

app.use((req, res, next) => addHeaders(req, res, next));

routes(rootRouter);
app.use('/', rootRouter);

const port = process.env.PORT || 3000;
app.set('port', port);

const server = app.listen(port, function () {
    console.log("Server is running on ", port, app.settings.env);
});
server.listen(port);

console.info("Server is running on port: " + port);