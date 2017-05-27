import sequelize from './index';
import * as Sequelize from 'sequelize';
import * as _ from 'lodash';

export class Season {

    public static season: any;
    private static seasonFields = ['id', 'name', 'ordering', 'introduction', 'created_at', 'updated_at'];
    
    constructor() {

        Season.season = sequelize.define('seasons', {            
            id: {primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4},
            name: {type: Sequelize.STRING, unique: true},
            ordering: {type: Sequelize.INTEGER},
            introduction: {type: Sequelize.TEXT},
            createdAt: {type: Sequelize.DATE, field: 'created_at'},
            updatedAt: {type: Sequelize.DATE, field: 'updated_at'}
        },
        {freezeTableName: true});       
    }

    public static loadAll() {

        return this.season.findAll({attributes: this.seasonFields});
    }

    private static saveSeason(season : any) {
        
        season.id = season.id ? season.id : undefined;

        return new Promise((resolve, reject) => {
            let query = {attributes: this.seasonFields, where: {name: season.name}};
            this.season.findOne(query).then((otherseason  : any) => {
                if(!otherseason || otherseason.id === season.id){
                    (season.id ? this.season.update(season, {where: {id: season.id}}).then(() => season) : this.season.create(season))
                    .then((season  : any) => resolve(season)).catch(reject);
                } else {                    
                    reject(new Error('season with this name is already exist'));
                }
            });
        });
    }

    private static prepareForClient(season  : any) {

        if (season) {
            let clientData : any = {};
            _.forEach(this.seasonFields, field => clientData[field] = season[field]);
            season = clientData;
        }
        return season;
    }

    public static save(season  : any) {

        return this.saveSeason(season).then((season) => this.prepareForClient(season));
    }

    public static findBySeasonName(seasonname : string) {

        return this.season.findOne({attributes: this.seasonFields, where: {name: seasonname}});
    }

    public static findBySeasonID(id : string) {

        return this.season.findOne({attributes: this.seasonFields, where: {id: id}});
    }

    public static removeSeasonByID(id : string) {

        return this.season.destroy({attributes: this.seasonFields, where: {id: id}});
    }

    public static init() {
        
        this.season.findOrCreate({
            where: {name: 'admin'}, defaults: {
                name: 'admin',
                ordering: 2,
                introduction: 'none'
            }
        });
    }
}
