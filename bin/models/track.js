"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function defineTrack(sequelize, DataTypes) {
    let Track = sequelize.define('Track', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        part: {
            type: DataTypes.STRING
        },
    }, {
        classMethods: {
            associate: function (models) {
                Track.belongsTo(models.Episode, {
                    foreignKey: 'episodeId',
                    onDelete: 'CASCADE'
                });
                Track.hasMany(models.TrackView, {
                    foreignKey: 'trackId',
                    as: 'views'
                });
            }
        }
    });
    return Track;
}
exports.default = defineTrack;
//# sourceMappingURL=track.js.map