"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const Sequelize = require("sequelize");
const episode_1 = require("./episode");
class Moment {
    constructor() {
        Moment.moment = index_1.default.define('moments', {
            id: { primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 },
            name: { type: Sequelize.STRING, unique: true },
            episodeId: {
                model: episode_1.Episode.episode,
                type: Sequelize.STRING,
                field: "episode_id",
                key: 'id',
                unique: true,
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            createdAt: { type: Sequelize.DATE, field: 'created_at' },
            updatedAt: { type: Sequelize.DATE, field: 'updated_at' }
        }, { freezeTableName: true });
    }
    static loadAll() {
        return this.moment.findAll({ attributes: this.momentFields });
    }
    static save(episodeId, name) {
        return this.moment.findOrCreate({
            where: { episodeId: episodeId }, defaults: {
                episodeId: episodeId
            }
        }).then((res) => {
            let moment = res[0];
            moment.name = name;
            return moment.save();
        });
    }
    static findByMomentName(momentname) {
        return this.moment.findOne({ attributes: this.momentFields, where: { name: momentname } });
    }
    static findByMomentID(id) {
        return this.moment.findOne({ attributes: this.momentFields, where: { id: id } });
    }
    static findByEpisodeID(episodeId) {
        return this.moment.findOne({ attributes: this.momentFields, where: { episodeId: episodeId } });
    }
    static removeMomentByID(id) {
        return this.moment.destroy({ attributes: this.momentFields, where: { id: id } });
    }
    static init() {
        return this.moment.findOrCreate();
    }
}
Moment.momentFields = ['id', 'name', 'episode_id', 'created_at', 'updated_at'];
exports.Moment = Moment;
