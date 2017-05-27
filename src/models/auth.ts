import sequelize from './index';
import * as Sequelize from 'sequelize';
import * as _ from 'lodash';

import { User } from './user';


export class AuthToken {

    public static authToken: any;
    private static authTokenFields = ['id', 'token', 'user_id', 'created_at', 'updated_at'];
    
    constructor() {
        
        AuthToken.authToken = sequelize.define('authTokens', {            
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

    public static loadAll() {
        
        return this.authToken.findAll({attributes: this.authTokenFields});
    }    

    public static save(userId : string, token : string) {

        return this.authToken.findOrCreate({
            where: {userId: userId}, defaults: {
                userId: userId,
            }
        }).then((res : any) => {
            let authToken = res[0];
            authToken.token = token;
            return authToken.save();
        });
    }

    public static findByAuthTokenName(authTokenName : string) {
        
        return this.authToken.findOne({attributes: this.authTokenFields, where: {name: authTokenName}});
    }

    public static findByAuthTokenID(id : string) {
        
        return this.authToken.findOne({attributes: this.authTokenFields, where: {id: id}});
    }

    public static findByUserID(userId : string) {
       
        return this.authToken.findOne({attributes: this.authTokenFields, where: {user_id: userId}});
    }

    public static removeAuthTokenByID(id : string) {
        
        return this.authToken.destroy({attributes: this.authTokenFields, where: {id: id}});
    }   

    public static init() {
        
        return this.authToken.findOrCreate();
    }
    
    public static clearUserSession(userIds : any) {
        
        userIds = typeof userIds === 'string' ?  [userIds] : userIds;
        return this.authToken.destroy({where: {userId: {$in: userIds}}});
    }
}
