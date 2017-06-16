"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function defineSeason(sequelize, DataTypes) {
    let Season = sequelize.define('Season', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        ordering: {
            type: DataTypes.INTEGER
        },
        introduction: {
            type: DataTypes.TEXT
        },
        totalEpisode: {
            type: DataTypes.INTEGER
        }
    }, {
        classMethods: {
            associate: function (models) {
                Season.hasMany(models.Episode, {
                    foreignKey: 'seasonId',
                    as: 'episodes'
                });
            }
        }
    });
    return Season;
}
exports.default = defineSeason;
//# sourceMappingURL=season.js.map