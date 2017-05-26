"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const Sequelize = require("sequelize");
const user_1 = require("./user");
class AuthToken {
    constructor() {
        AuthToken.authToken = index_1.default.define('authTokens', {
            id: { primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 },
            token: { type: Sequelize.STRING, unique: true },
            userId: {
                model: user_1.User.user,
                type: Sequelize.STRING,
                field: "user_id",
                key: 'id',
                unique: true,
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            createdAt: { type: Sequelize.DATE, field: 'created_at' },
            updatedAt: { type: Sequelize.DATE, field: 'updated_at' }
        }, { freezeTableName: true });
    }
    static loadAll() {
        return this.authToken.findAll({ attributes: this.authTokenFields });
    }
    static save(userId, token) {
        return this.authToken.findOrCreate({
            where: { userId: userId }, defaults: {
                userId: userId,
            }
        }).then((res) => {
            let authToken = res[0];
            authToken.token = token;
            return authToken.save();
        });
    }
    static findByAuthTokenName(authTokenName) {
        return this.authToken.findOne({ attributes: this.authTokenFields, where: { name: authTokenName } });
    }
    static findByAuthTokenID(id) {
        return this.authToken.findOne({ attributes: this.authTokenFields, where: { id: id } });
    }
    static findByUserID(userId) {
        return this.authToken.findOne({ attributes: this.authTokenFields, where: { user_id: userId } });
    }
    static removeAuthTokenByID(id) {
        return this.authToken.destroy({ attributes: this.authTokenFields, where: { id: id } });
    }
    static init() {
        return this.authToken.findOrCreate();
    }
    static clearUserSession(userIds) {
        userIds = typeof userIds === 'string' ? [userIds] : userIds;
        return this.authToken.destroy({ where: { userId: { $in: userIds } } });
    }
}
AuthToken.authTokenFields = ['id', 'token', 'user_id', 'created_at', 'updated_at'];
exports.AuthToken = AuthToken;
