import * as Sequelize from 'sequelize';

export interface ViewAttributes {    
    id?: string;
    title?: string;
    ordering?: number;
    type?: string;
    content?: string;
    momentId?: string 
}

export interface ViewInstance extends Sequelize.Instance<ViewAttributes> {
    id: string;
    createAt: Date;
    updateAt: Date;    

    title: string;
    ordering: number;
    type: string;
    content: string; 
    momentId: string   
}

export default function defineView(sequelize: Sequelize.Sequelize, DataTypes) {
    let View = sequelize.define('View', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        title: {
            type: DataTypes.STRING,
            unique: true
        },
        ordering: {
            type: DataTypes.INTEGER
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
                View.belongsTo(models.Moment, {
                    foreignKey: 'momentId',
                    onDelete: 'CASCADE'
                })
            }
        }
    });

    return View;
}