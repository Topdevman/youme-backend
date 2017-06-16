import * as Sequelize from 'sequelize';

export interface UserAttributes {
    id?: string;    
    userId?: string;
    secret?: string;
}

export interface UserInstance extends Sequelize.Instance<UserAttributes> {
    id: string;
    createAt: Date;
    updateAt: Date;

    userId: string;
    secret: string;
}

export default function defineUser(sequelize: Sequelize.Sequelize, DataTypes) {
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