"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function defineAuthToken(sequelize, DataTypes) {
    let AuthToken = sequelize.define('AuthToken', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        token: {
            type: DataTypes.STRING,
            unique: true
        },
        userId: {
            type: DataTypes.STRING,
            unique: true
        }
    });
    return AuthToken;
}
exports.default = defineAuthToken;
//# sourceMappingURL=authtoken.js.map