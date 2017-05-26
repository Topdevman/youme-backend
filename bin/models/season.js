"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const Sequelize = require("sequelize");
const _ = require("lodash");
class Season {
    constructor() {
        Season.season = index_1.default.define('seasons', {
            id: { primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 },
            name: { type: Sequelize.STRING, unique: true },
            ordering: { type: Sequelize.INTEGER },
            introduction: { type: Sequelize.TEXT },
            createdAt: { type: Sequelize.DATE, field: 'created_at' },
            updatedAt: { type: Sequelize.DATE, field: 'updated_at' }
        }, { freezeTableName: true });
    }
    static loadAll() {
        return this.season.findAll({ attributes: this.seasonFields });
    }
    static saveSeason(season) {
        season.id = season.id ? season.id : undefined;
        return new Promise((resolve, reject) => {
            let query = { attributes: this.seasonFields, where: { name: season.name } };
            this.season.findOne(query).then((otherseason) => {
                if (!otherseason || otherseason.id === season.id) {
                    (season.id ? this.season.update(season, { where: { id: season.id } }).then(() => season) : this.season.create(season))
                        .then((season) => resolve(season)).catch(reject);
                }
                else {
                    reject(new Error('season with this name is already exist'));
                }
            });
        });
    }
    static prepareForClient(season) {
        if (season) {
            let clientData = {};
            _.forEach(this.seasonFields, field => clientData[field] = season[field]);
            season = clientData;
        }
        return season;
    }
    static save(season) {
        return this.saveSeason(season).then((season) => this.prepareForClient(season));
    }
    static findBySeasonName(seasonname) {
        return this.season.findOne({ attributes: this.seasonFields, where: { name: seasonname } });
    }
    static findBySeasonID(id) {
        return this.season.findOne({ attributes: this.seasonFields, where: { id: id } });
    }
    static removeSeasonByID(id) {
        return this.season.destroy({ attributes: this.seasonFields, where: { id: id } });
    }
    static init() {
        this.season.findOrCreate({
            where: { name: 'admin' }, defaults: {
                name: 'admin',
                ordering: 2,
                introduction: 'none'
            }
        });
    }
}
Season.seasonFields = ['id', 'name', 'ordering', 'introduction', 'created_at', 'updated_at'];
exports.Season = Season;
