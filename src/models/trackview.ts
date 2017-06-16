import * as Sequelize from 'sequelize';

export interface TrackViewAttributes {    
    id?: string;
    title?: string;
    type?: string;
    content?: string;
    trackId?: string 
}

export interface TrackViewInstance extends Sequelize.Instance<TrackViewAttributes> {
    id: string;
    createAt: Date;
    updateAt: Date;    

    title: string;
    type: string;
    content: string; 
    trackId: string   
}

export default function defineTrackView(sequelize: Sequelize.Sequelize, DataTypes) {
    let TrackView = sequelize.define('TrackView', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        title: {
            type: DataTypes.STRING,
            unique: true
        },        
        type: {
            type: DataTypes.STRING
        },
        content: {
            type: DataTypes.TEXT
        }
    }, {
        classMethods: {
            associate: function(models) {
                TrackView.belongsTo(models.Moment, {
                    foreignKey: 'trackId',
                    onDelete: 'CASCADE'
                })
            }
        }
    });

    return TrackView;
}