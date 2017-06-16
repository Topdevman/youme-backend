"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function defineView(sequelize, DataTypes) {
    let View = sequelize.define('View', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        title: {
            type: DataTypes.STRING,
            unique: true
        },
        ordering: {
            type: DataTypes.INTEGER
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
                View.belongsTo(models.Moment, {
                    foreignKey: 'momentId',
                    onDelete: 'CASCADE'
                });
            }
        }
    });
    return View;
}
exports.default = defineView;
//# sourceMappingURL=view.js.map