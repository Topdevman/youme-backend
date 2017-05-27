"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const Sequelize = require("sequelize");
const season_1 = require("./season");
class Episode {
    constructor() {
        Episode.episode = index_1.default.define('episodes', {
            id: { primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 },
            name: { type: Sequelize.STRING, unique: true },
            seasonId: {
                model: season_1.Season.season,
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
    static loadAll() {
        return this.episode.findAll({ attributes: this.episodeFields });
    }
    static save(seasonId, name) {
        return this.episode.findOrCreate({
            where: { seasonId: seasonId },
            defaults: { seasonId: seasonId }
        }).then((res) => {
            let episode = res[0];
            episode.name = name;
            return episode.save();
        });
    }
    static findByEpisodeName(episodename) {
        return this.episode.findOne({ attributes: this.episodeFields, where: { name: episodename } });
    }
    static findByEpisodeID(id) {
        return this.episode.findOne({ attributes: this.episodeFields, where: { id: id } });
    }
    static findBySeasonID(seasonId) {
        return this.episode.findOne({ attributes: this.episodeFields, where: { season_id: seasonId } });
    }
    static removeEpisodeByID(id) {
        return this.episode.destroy({ attributes: this.episodeFields, where: { id: id } });
    }
    static init() {
        return this.episode.findOrCreate();
    }
}
Episode.episodeFields = ['id', 'name', 'season_id', 'created_at', 'updated_at'];
exports.Episode = Episode;
