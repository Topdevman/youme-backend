import * as Sequelize from 'sequelize';

export interface AuthTokenAttributes {
    id?: string;    
    token?: string;
    userId?: string;
}

export interface AuthTokenInstance extends Sequelize.Instance<AuthTokenAttributes> {
    id: string;
    createAt: Date;
    updateAt: Date;

    token: string;
    userId: string;
}

export default function defineAuthToken(sequelize: Sequelize.Sequelize, DataTypes) {
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