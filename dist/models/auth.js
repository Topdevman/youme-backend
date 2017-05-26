"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const Sequelize = require("sequelize");
class AuthToken {
    constructor(User) {
        this.User = User;
        this.authTokenFields = ['id', 'token', 'user_id', 'created_at', 'updated_at'];
        this.loadAll = function () {
            return this.authToken.findAll({ attributes: this.authTokenFields });
        };
        this.save = function (userId, token) {
            return this.authToken.findOrCreate({
                where: { userId: userId }, defaults: {
                    userId: userId,
                }
            }).then((res) => {
                let authToken = res[0];
                authToken.token = token;
                return authToken.save();
            });
        };
        this.findByAuthTokenName = function (authTokenName) {
            return this.authToken.findOne({ attributes: this.authTokenFields, where: { name: authTokenName } });
        };
        this.findByAuthTokenID = function (id) {
            return this.authToken.findOne({ attributes: this.authTokenFields, where: { id: id } });
        };
        this.findByUserID = function (userId) {
            return this.authToken.findOne({ attributes: this.authTokenFields, where: { user_id: userId } });
        };
        this.removeAuthTokenByID = function (id) {
            return this.authToken.destroy({ attributes: this.authTokenFields, where: { id: id } });
        };
        this.init = function () {
            return this.authToken.findOrCreate();
        };
        this.clearUserSession = function (userIds) {
            userIds = typeof userIds === 'string' ? [userIds] : userIds;
            return this.authToken.destroy({ where: { userId: { $in: userIds } } });
        };
        this.authToken = index_1.default.define('authTokens', {
            id: { primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 },
            token: { type: Sequelize.STRING, unique: true },
            userId: {
                model: User.user,
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
}
exports.default = AuthToken;
