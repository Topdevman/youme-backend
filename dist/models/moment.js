"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const Sequelize = require("sequelize");
class Episode {
    constructor(Episode) {
        this.Episode = Episode;
        this.momentFields = ['id', 'name', 'episode_id', 'created_at', 'updated_at'];
        this.loadAll = function () {
            return this.moment.findAll({ attributes: this.momentFields });
        };
        this.save = function (episodeId, name) {
            return this.moment.findOrCreate({
                where: { episodeId: episodeId }, defaults: {
                    episodeId: episodeId
                }
            }).then((res) => {
                let moment = res[0];
                moment.name = name;
                return moment.save();
            });
        };
        this.findByMomentname = function (momentname) {
            return this.moment.findOne({ attributes: this.momentFields, where: { name: momentname } });
        };
        this.findByMomentID = function (id) {
            return this.moment.findOne({ attributes: this.momentFields, where: { id: id } });
        };
        this.findByEpisodeID = function (episodeId) {
            return this.moment.findOne({ attributes: this.momentFields, where: { episodeId: episodeId } });
        };
        this.removeMomentByID = function (id) {
            return this.moment.destroy({ attributes: this.momentFields, where: { id: id } });
        };
        this.init = function () {
            return this.moment.findOrCreate();
        };
        this.moment = index_1.default.define('moments', {
            id: { primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 },
            name: { type: Sequelize.STRING, unique: true },
            episodeId: {
                model: Episode.episode,
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
}
exports.default = Episode;
