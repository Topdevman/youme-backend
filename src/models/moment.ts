import sequelize from './index';
import * as Sequelize from 'sequelize';
import * as _ from 'lodash';

import { Episode } from './episode';

export class Moment {

    public static moment: any;
    private static momentFields = ['id', 'name', 'episode_id', 'created_at', 'updated_at'];
    
    constructor() {
        
        Moment.moment = sequelize.define('moments', {            
            id: {primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4},
            name: {type: Sequelize.STRING, unique: true},
            episodeId: {
                model: Episode.episode,
                type: Sequelize.STRING,
                field: "episode_id",
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

        return this.moment.findAll({attributes: this.momentFields});
    }    

    public static save(episodeId : string, name : string) {

        return this.moment.findOrCreate({
            where: {episodeId: episodeId},
            defaults: {episodeId: episodeId}
            }).then((res : any) => {
                let moment = res[0];
                moment.name = name;
                return moment.save();
            });
    }

    public static findByMomentName(momentname : string) {
        
        return this.moment.findOne({attributes: this.momentFields, where: {name: momentname}});
    }

    public static findByMomentID(id : string) {
        
        return this.moment.findOne({attributes: this.momentFields, where: {id: id}});
    }

    public static findByEpisodeID(episodeId : string) {
        
        return this.moment.findOne({attributes: this.momentFields, where: {episodeId: episodeId}});
    }

    public static removeMomentByID(id : string) {
        
        return this.moment.destroy({attributes: this.momentFields, where: {id: id}});
    }   

    public static init() {
        
        return this.moment.findOrCreate();
    }
}
