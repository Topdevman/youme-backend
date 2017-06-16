import * as Sequelize from 'sequelize';

export interface SeasonAttributes {    
    id?: string;
    name?: string;
    ordering?: number;
    introduction?: string;
    totalEpisode?: number;
}

export interface SeasonInstance extends Sequelize.Instance<SeasonAttributes> {
    id: string;
    createAt: Date;
    updateAt: Date;    

    name: string;
    ordering: number;
    introduction: string;
    totalEpisode: number;
}

export default function defineSeason(sequelize: Sequelize.Sequelize, DataTypes) {
    let Season = sequelize.define('Season', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        ordering: {
            type: DataTypes.INTEGER
        },
        introduction: {
            type: DataTypes.TEXT
        },
        totalEpisode: {
            type: DataTypes.INTEGER
        }
    }, {
        classMethods: {
            associate: function(models) {
                Season.hasMany(models.Episode, {
                    foreignKey: 'seasonId',
                    as: 'episodes'
                })
            }
        }
    });

    return Season;
}