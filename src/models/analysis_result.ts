import * as Sequelize from 'sequelize';

export interface AnalysisResultAttributes {    
    id?: string;
    episode?: string;
    moment?: string;
    part?: string;
    author?: string;
    name?: string;
    result?: string;
}

export interface AnalysisResultInstance extends Sequelize.Instance<AnalysisResultAttributes> {
    id: string;
    createAt: Date;
    updateAt: Date;    

    episode: string;
    moment: string;
    part: string;
    author: string;
    name: string;
    result: string;
}

export default function defineAnalysisResult(sequelize: Sequelize.Sequelize, DataTypes) {
    let AnalysisResult = sequelize.define('AnalysisResult', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        episode: {
            type: DataTypes.STRING,
            unique: true
        },
        moment: {
            type: DataTypes.STRING,
            unique: true
        },
        part: {
            type: DataTypes.STRING,
            unique: true
        },
        author: {
            type: DataTypes.STRING,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        result: {
            type: DataTypes.STRING,
            unique: true
        }        
    });

    return AnalysisResult;
}