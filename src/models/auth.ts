import sequelize from './index';
import * as Sequelize from 'sequelize';
import * as _ from 'lodash';
import userModel from './user';

export default class AuthToken {

    public authToken: any;
    private authTokenFields = ['id', 'token', 'user_id', 'created_at', 'updated_at'];
    
    constructor(private User: userModel) {
        this.authToken = sequelize.define('authTokens', {            
            id: {primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4},
            token: {type: Sequelize.STRING, unique: true},
            userId: {
                model: User.user,
                type: Sequelize.STRING,
                field: "user_id",
                key: 'id',
                unique: true,
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            },         
            createdAt: {type: Sequelize.DATE, field: 'created_at'},
            updatedAt: {type: Sequelize.DATE, field: 'updated_at'}
        },
        {freezeTableName: true});       
    }

    public loadAll = function () {
        return this.authToken.findAll({attributes: this.authTokenFields});
    }    

    public save = function (userId, token) {

        return this.authToken.findOrCreate({
            where: {userId: userId}, defaults: {
                userId: userId,
            }
        }).then((res) => {
            let authToken = res[0];
            authToken.token = token;
            return authToken.save();
        });
    }

    public findByAuthTokenName = function (authTokenName) {
        return this.authToken.findOne({attributes: this.authTokenFields, where: {name: authTokenName}});
    }

    public findByAuthTokenID = function (id) {
        return this.authToken.findOne({attributes: this.authTokenFields, where: {id: id}});
    }

    public findByUserID = function (userId) {
        return this.authToken.findOne({attributes: this.authTokenFields, where: {user_id: userId}});
    }

    public removeAuthTokenByID = function (id) {
        return this.authToken.destroy({attributes: this.authTokenFields, where: {id: id}});
    }   

    public init = function () {
        return this.authToken.findOrCreate();
    }
    
    public clearUserSession = function (userIds) {
        userIds = typeof userIds === 'string' ?  [userIds] : userIds;
        return this.authToken.destroy({where: {userId: {$in: userIds}}});
    }
}
