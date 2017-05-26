"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const Sequelize = require("sequelize");
class Episode {
    constructor(Season) {
        this.Season = Season;
        this.episodeFields = ['id', 'name', 'season_id', 'created_at', 'updated_at'];
        this.loadAll = function () {
            return this.episode.findAll({ attributes: this.episodeFields });
        };
        this.save = function (seasonId, name) {
            return this.episode.findOrCreate({
                where: { seasonId: seasonId }, defaults: {
                    seasonId: seasonId,
                }
            }).then((res) => {
                let episode = res[0];
                episode.name = name;
                return episode.save();
            });
        };
        this.findByEpisodeName = function (episodename) {
            return this.episode.findOne({ attributes: this.episodeFields, where: { name: episodename } });
        };
        this.findByEpisodeID = function (id) {
            return this.episode.findOne({ attributes: this.episodeFields, where: { id: id } });
        };
        this.findBySeasonID = function (seasonId) {
            return this.episode.findOne({ attributes: this.episodeFields, where: { season_id: seasonId } });
        };
        this.removeEpisodeByID = function (id) {
            return this.episode.destroy({ attributes: this.episodeFields, where: { id: id } });
        };
        this.init = function () {
            return this.episode.findOrCreate();
        };
        this.episode = index_1.default.define('episodes', {
            id: { primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 },
            name: { type: Sequelize.STRING, unique: true },
            seasonId: {
                model: Season.season,
                type: Sequelize.STRING,
                field: "season_id",
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
