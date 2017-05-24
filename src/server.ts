import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as http from 'http';
import * as path from 'path';
import sequelize from './models/index';
import routes from './routes';
import User from './models/user';
import Season from './models/season';

// const routes = require('./routes');
const rootRouter = express.Router();
let userModel = new User();
let seasonModel = new Season();

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).send({ message: 'Welcome to the beginning of nothingness.' });
})

sequelize.sync({force: false}).then(() => {
  userModel.init();
  seasonModel.init();
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

routes(rootRouter);
app.use('/', rootRouter);

const port = process.env.PORT || 3000;
app.set('port', port);

const server = app.listen(port, function () {
    console.log("Server is running on ", port, app.settings.env);
});
server.listen(port);

console.info("Server is running on port: " + port);