import * as Sequelize from 'sequelize';

export interface TrackAttributes {    
    id?: string;
    name?: string;
    part?: string;    
    episodeId: string
}

export interface TrackInstance extends Sequelize.Instance<TrackAttributes> {
    id: string;
    createAt: Date;
    updateAt: Date;    

    name: string;
    part: string;    
    episodeId: string;
}

export default function defineTrack(sequelize: Sequelize.Sequelize, DataTypes) {
    let Track = sequelize.define('Track', {
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
    }, {
        classMethods: {
            associate: function(models) {
                Track.belongsTo(models.Episode, {
                    foreignKey: 'episodeId',
                    onDelete: 'CASCADE'
                });
                Track.hasMany(models.TrackView, {
                    foreignKey: 'trackId',
                    as: 'views'
                });
            }
        }
    });

    return Track;
}