import * as Sequelize from 'sequelize';

export interface MomentAttributes {    
    id?: string;
    name?: string;
    part?: string;    
    totalView?: number;
    episodeId: string
}

export interface MomentInstance extends Sequelize.Instance<MomentAttributes> {
    id: string;
    createAt: Date;
    updateAt: Date;    

    name: string;
    part: string;    
    totalView: number;
    episodeId: string;
}

export default function defineMoment(sequelize: Sequelize.Sequelize, DataTypes) {
    let Moment = sequelize.define('Moment', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        part: {
            type: DataTypes.STRING
        },        
        totalView: {
            type: DataTypes.INTEGER
        }
    }, {
        classMethods: {
            associate: function(models) {
                Moment.belongsTo(models.Episode, {
                    foreignKey: 'episodeId',
                    onDelete: 'CASCADE'
                });
                Moment.hasMany(models.View, {
                    foreignKey: 'momentId',
                    as: 'views'
                });
            }
        }
    });

    return Moment;
}