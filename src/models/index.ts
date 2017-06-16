import * as Sequelize from 'sequelize';
import * as fs from 'fs';
import * as path from 'path';

const config = require('../config/config.json')

import { SeasonInstance, SeasonAttributes } from './season';
import { EpisodeInstance, EpisodeAttributes } from './episode';
import { MomentInstance, MomentAttributes } from './moment';
import { TrackInstance, TrackAttributes } from './track';
import { ViewInstance, ViewAttributes } from './view';
import { TrackViewInstance, TrackViewAttributes } from './trackview';
import { UserInstance, UserAttributes } from './user';
import { AuthTokenInstance, AuthTokenAttributes } from './authtoken';

interface DbConnection {
    Season: Sequelize.Model<SeasonInstance, SeasonAttributes>,
    Episode: Sequelize.Model<EpisodeInstance, EpisodeAttributes>,
    Moment: Sequelize.Model<MomentInstance, MomentAttributes>,
    Track: Sequelize.Model<TrackInstance, TrackAttributes>,
    View: Sequelize.Model<ViewInstance, ViewAttributes>,
    TrackView: Sequelize.Model<TrackViewInstance, TrackViewAttributes>
    User: Sequelize.Model<UserInstance, UserAttributes>,
    AuthToken: Sequelize.Model<AuthTokenInstance, AuthTokenAttributes>

}

let db = {};

const dbConfig = config['development']
const sequelize = new Sequelize(
    dbConfig['database'],
    dbConfig['username'],
    dbConfig['password'],
    dbConfig
)

const basename  = path.basename(module.filename);
fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function(file) {
        const model = sequelize['import'](path.join(__dirname, file));
        // NOTE: you have to change from the original property notation to
        // index notation or tsc will complain about undefined property.
        db[model['name']] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db['sequelize'] = sequelize;
db['Sequelize'] = Sequelize;

export default <DbConnection>db;