"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function defineMoment(sequelize, DataTypes) {
    let Moment = sequelize.define('Moment', {
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
        totalView: {
            type: DataTypes.INTEGER
        }
    }, {
        classMethods: {
            associate: function (models) {
                Moment.belongsTo(models.Episode, {
                    foreignKey: 'episodeId',
                    onDelete: 'CASCADE'
                });
                Moment.hasMany(models.View, {
                    foreignKey: 'momentId',
                    as: 'views'
                });
            }
        }
    });
    return Moment;
}
exports.default = defineMoment;
//# sourceMappingURL=moment.js.map