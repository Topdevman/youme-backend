import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as http from 'http';
import * as path from 'path';
import * as passwordHash from 'password-hash';
import * as cors from 'cors';

// import { User } from './models/user';
import { APIController } from './controllers/api';
// import { Migrate } from './db/migrate';
// import { Authenticator } from './middleware/authenticator';

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

let apiController = new APIController(app);

app.get('/', (req, res, next) => {    
    res.status(200).send({ message: 'Welcome to the beginning of nothingness.' });
    next();
});

const port = process.env.PORT || 3000;
app.set('port', port);

const server = app.listen(port, function () {  
    console.log("Server is running on ", port, app.settings.env);
});

