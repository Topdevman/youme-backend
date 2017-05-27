import sequelize from './index';
import * as Sequelize from 'sequelize';
import * as _ from 'lodash';

import { Season } from './season';


export class Episode {

    public static episode: any;
    private static episodeFields = ['id', 'name', 'season_id', 'created_at', 'updated_at'];    

    constructor() {
        
        Episode.episode = sequelize.define('episodes', {            
            id: {primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4},
            name: {type: Sequelize.STRING, unique: true},
            seasonId: {
                model: Season.season,
                type: Sequelize.STRING,
                field: "season_id",
                key: 'id',
                unique: true,
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            },         
            createdAt: {type: Sequelize.DATE, field: 'created_at'},
            updatedAt: {type: Sequelize.DATE, field: 'updated_at'}
        },
        {freezeTableName: true});       
    }

    public static loadAll() {
        
        return this.episode.findAll({attributes: this.episodeFields});
    }    

    public static save(seasonId : string, name : string) {
        
        return this.episode.findOrCreate({
            where: {seasonId: seasonId},
            defaults: {seasonId: seasonId}
            }).then((res : any) => {
                let episode = res[0];
                episode.name = name;
                return episode.save();
            });
    }

    public static findByEpisodeName(episodename : string) {
        
        return this.episode.findOne({attributes: this.episodeFields, where: {name: episodename}});
    }

    public static findByEpisodeID(id : string) {
        
        return this.episode.findOne({attributes: this.episodeFields, where: {id: id}});
    }

    public static findBySeasonID(seasonId : string) {
        
        return this.episode.findOne({attributes: this.episodeFields, where: {season_id: seasonId}});
    }

    public static removeEpisodeByID(id : string) {
        
        return this.episode.destroy({attributes: this.episodeFields, where: {id: id}});
    }   

    public static init() {
       
        return this.episode.findOrCreate();
    }
}
