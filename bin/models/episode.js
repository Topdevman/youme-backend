"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function defineEpisode(sequelize, DataTypes) {
    let Episode = sequelize.define('Episode', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            unique: true
        }
    }, {
        classMethods: {
            associate: function (models) {
                Episode.belongsTo(models.Season, {
                    foreignKey: 'seasonId',
                    onDelete: 'CASCADE'
                });
                Episode.hasMany(models.Moment, {
                    foreignKey: 'episodeId',
                    as: 'moments'
                });
                Episode.hasMany(models.Track, {
                    foreignKey: 'episodeId',
                    as: 'tracks'
                });
            }
        }
    });
    return Episode;
}
exports.default = defineEpisode;
//# sourceMappingURL=episode.js.map