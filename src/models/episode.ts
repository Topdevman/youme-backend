import * as Sequelize from 'sequelize';

export interface EpisodeAttributes {
    id?: string;    
    name?: string;
    seasonId?: string;
}

export interface EpisodeInstance extends Sequelize.Instance<EpisodeAttributes> {
    id: string;
    createAt: Date;
    updateAt: Date;

    name: string;
    seasonId: string;
}

export default function defineEpisode(sequelize: Sequelize.Sequelize, DataTypes) {
    let Episode = sequelize.define('Episode', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            unique: true
        }        
    }, {
        classMethods: {
            associate: function(models) {
                Episode.belongsTo(models.Season, {
                    foreignKey: 'seasonId',
                    onDelete: 'CASCADE'
                });
                Episode.hasMany(models.Moment, {
                    foreignKey: 'episodeId',
                    as: 'moments'
                });
                Episode.hasMany(models.Track, {
                    foreignKey: 'episodeId',
                    as: 'tracks'
                });
            }
        }
    });

    return Episode;
}