import sequelize from './index';
import * as Sequelize from 'sequelize';
import * as _ from 'lodash';
import * as passwordHash from 'password-hash';

const passwordGenerator = require('generate-password');

export class User {

    public static user: any;
    private static userFields = ['id', 'provider', 'username', 'password', 'first_name', 'last_name', 'gender', 'oauth_token', 'oauth_expires_at', 'avatar', 'created_at', 'updated_at'];
        
    constructor() {

        User.user = sequelize.define('users', {
            provider: {type: Sequelize.STRING},
            id: {primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4},
            username: {type: Sequelize.STRING, unique: true},
            password: {type: Sequelize.STRING},
            first_name: {type: Sequelize.STRING, field: 'first_name'},
            last_name: {field: 'last_name', type: Sequelize.STRING},
            gender: {type: Sequelize.STRING},
            oauth_token: {type: Sequelize.STRING},
            oauth_expires_at: {type: Sequelize.DATE},
            avatar: {type: Sequelize.STRING},
            createdAt: {type: Sequelize.DATE, field: 'created_at'},
            updatedAt: {type: Sequelize.DATE, field: 'updated_at'}
        },
        {freezeTableName: true});     
    }

    public static loadAll() {

        return this.user.findAll({attributes: this.userFields});
    }

    private static saveUser(user : any) {

        user.password = !user.id && !user.password ? passwordGenerator.generate({
            length: 20,
            numbers: true
        }) : user.password;

        if (user.password) {
            user.password = passwordHash.generate(user.password);
        } else {
            delete user["password"];
        }
        
        user.id = user.id ? user.id : undefined;
        user.username = user.username ? user.username.trim() : user.username;

        return new Promise((resolve, reject) => {

            let query = {attributes: this.userFields, where: {username: user.username}};
            this.user.findOne(query).then((otherUser : any) => {
                if(!otherUser || otherUser.id === user.id){
                    (user.id ? this.user.update(user, {where: {id: user.id}}).then(() => user) : this.user.create(user))
                    .then((user : any) => resolve(user)).catch(reject);
                } else {                    
                    reject(new Error('User with this name is already exist'));
                }
            });
        });
    }

    private static prepareForClient(user : any) {

        if (user) {
            let clientData : any = {};
            _.forEach(this.userFields, field => clientData[field] = user[field]);
            user = clientData;
        }
        return user;
    }

    public static save(user : any) {

        return this.saveUser(user).then((user) => this.prepareForClient(user));
    }

    public static findByUserName(username) {

        return this.user.findOne({attributes: this.userFields, where: {username: username}});
    }

    public static findByUserID(id : string) {

        return this.user.findOne({attributes: this.userFields, where: {id: id}});
    }

    public static findExpiredUsers(limit : any) {

        return this.user.findAll({attributes: this.userFields, where: {oauth_expires_at: {lt: new Date()}}, order: 'oauth_expires_at', limit: limit});
    }

    public static removeUserByID(id : string) {

        return this.user.destroy({attributes: this.userFields, where: {id: id}});
    }

    public static init() {
        
        this.user.findOrCreate({
            where: {username: 'admin'}, defaults: {
                name: 'admin',
                provider: 'local',
                first_name: 'Davor',
                last_name: 'Veljan',
                gender: 'mail',                
                avatar: 'none',
                password: passwordHash.generate('qwerty123')
            }
        });
    }
}
