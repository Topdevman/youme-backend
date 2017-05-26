import sequelize from './index';
import * as Sequelize from 'sequelize';
import * as _ from 'lodash';

export default class Season {

    public season: any;
    private seasonFields = ['id', 'name', 'ordering', 'introduction', 'created_at', 'updated_at'];
    
    constructor() {
        this.season = sequelize.define('seasons', {            
            id: {primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4},
            name: {type: Sequelize.STRING, unique: true},
            ordering: {type: Sequelize.INTEGER},
            introduction: {type: Sequelize.TEXT},
            createdAt: {type: Sequelize.DATE, field: 'created_at'},
            updatedAt: {type: Sequelize.DATE, field: 'updated_at'}
        },
        {freezeTableName: true});       
    }

    public loadAll = function () {
        return this.season.findAll({attributes: this.seasonFields});
    }

    private saveSeason = function (season) {
        
        season.id = season.id ? season.id : undefined;

        return new Promise((resolve, reject) => {
            let query = {attributes: this.seasonFields, where: {name: season.name}};
            this.season.findOne(query).then((otherseason) => {
                if(!otherseason || otherseason.id === season.id){
                    (season.id ? this.season.update(season, {where: {id: season.id}}).then(() => season) : this.season.create(season))
                    .then((season) => resolve(season)).catch(reject);
                } else {                    
                    reject(new Error('season with this name is already exist'));
                }
            });
        });
    }

    private prepareForClient = function (season) {
        if (season) {
            let clientData = {};
            _.forEach(this.seasonFields, field => clientData[field] = season[field]);
            season = clientData;
        }
        return season;
    }

    public save = function (season) {
        return this.saveSeason(season).then((season) => this.prepareForClient(season));
    }

    public findBySeasonName = function (seasonname) {
        return this.season.findOne({attributes: this.seasonFields, where: {name: seasonname}});
    }

    public findBySeasonID = function (id) {
        return this.season.findOne({attributes: this.seasonFields, where: {id: id}});
    }

    public removeSeasonByID = function (id) {
        return this.season.destroy({attributes: this.seasonFields, where: {id: id}});
    }

    public init() {
        this.season.findOrCreate({
            where: {name: 'admin'}, defaults: {
                name: 'admin',
                ordering: 2,
                introduction: 'none'
            }
        });
    }
}
