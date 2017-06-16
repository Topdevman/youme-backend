"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function defineUser(sequelize, DataTypes) {
    let User = sequelize.define('User', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        userId: {
            type: DataTypes.STRING,
            unique: true
        },
        secret: {
            type: DataTypes.STRING,
            unique: true
        }
    });
    return User;
}
exports.default = defineUser;
//# sourceMappingURL=user.js.map