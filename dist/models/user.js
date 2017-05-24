"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const Sequelize = require("sequelize");
const _ = require("lodash");
class User {
    constructor() {
        this.userFields = ['id', 'name', 'first_name', 'last_name', 'gender', 'oauth_token', 'oauth_expires_at', 'avatar', 'created_at', 'updated_at'];
        this.loadAll = function () {
            return this.user.findAll({ attributes: this.userFields });
        };
        this.saveUser = function (user) {
            user.id = user.id ? user.id : undefined;
            return new Promise((resolve, reject) => {
                let query = { attributes: this.userFields, where: { name: user.name } };
                this.user.findOne(query).then((otherUser) => {
                    if (!otherUser || otherUser.id === user.id) {
                        (user.id ? this.user.update(user, { where: { id: user.id } }).then(() => user) : this.user.create(user))
                            .then((user) => resolve(user)).catch(reject);
                    }
                    else {
                        reject(new Error('User with this name is already exist'));
                    }
                });
            });
        };
        this.prepareForClient = function (user) {
            if (user) {
                let clientData = {};
                _.forEach(this.userFields, field => clientData[field] = user[field]);
                user = clientData;
            }
            return user;
        };
        this.save = function (user) {
            return this.saveUser(user).then((user) => this.prepareForClient(user));
        };
        this.findByUsername = function (username) {
            return this.user.findOne({ attributes: this.userFields, where: { name: username } });
        };
        this.findByUserID = function (id) {
            return this.user.findOne({ attributes: this.userFields, where: { id: id } });
        };
        this.findExpiredUsers = function (limit) {
            return this.user.findAll({ attributes: this.userFields, where: { oauth_expires_at: { lt: new Date() } }, order: 'oauth_expires_at', limit: limit });
        };
        this.removeUserByID = function (id) {
            return this.user.destroy({ attributes: this.userFields, where: { id: id } });
        };
        this.user = index_1.default.define('users', {
            provider: { type: Sequelize.STRING },
            id: { primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 },
            name: { type: Sequelize.STRING, unique: true },
            first_name: { type: Sequelize.STRING, field: 'first_name' },
            last_name: { field: 'last_name', type: Sequelize.STRING },
            gender: { type: Sequelize.STRING },
            oauth_token: { type: Sequelize.STRING },
            oauth_expires_at: { type: Sequelize.DATE },
            avatar: { type: Sequelize.STRING },
            createdAt: { type: Sequelize.DATE, field: 'created_at' },
            updatedAt: { type: Sequelize.DATE, field: 'updated_at' }
        }, { freezeTableName: true });
    }
    init() {
        this.user.findOrCreate({
            where: { name: 'admin' }, defaults: {
                name: 'admin',
                provider: 'local',
                first_name: 'Davor',
                last_name: 'Veljan',
                gender: 'mail',
                avatar: 'none'
            }
        });
    }
}
exports.default = User;
