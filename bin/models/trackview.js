"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function defineTrackView(sequelize, DataTypes) {
    let TrackView = sequelize.define('TrackView', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        title: {
            type: DataTypes.STRING,
            unique: true
        },
        type: {
            type: DataTypes.STRING
        },
        content: {
            type: DataTypes.TEXT
        }
    }, {
        classMethods: {
            associate: function (models) {
                TrackView.belongsTo(models.Moment, {
                    foreignKey: 'trackId',
                    onDelete: 'CASCADE'
                });
            }
        }
    });
    return TrackView;
}
exports.default = defineTrackView;
//# sourceMappingURL=trackview.js.map