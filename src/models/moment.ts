import sequelize from './index';
import * as Sequelize from 'sequelize';
import * as _ from 'lodash';
import episodeModel from './episode';

export default class Episode {

    public moment: any;
    private momentFields = ['id', 'name', 'episode_id', 'created_at', 'updated_at'];
    
    constructor(private Episode: episodeModel) {
        this.moment = sequelize.define('moments', {            
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

    public loadAll = function () {
        return this.moment.findAll({attributes: this.momentFields});
    }    

    public save = function (episodeId, name) {
        // return this.saveEpisode(episode).then((episode) => this.prepareForClient(episode));
        return this.moment.findOrCreate({
            where: {episodeId: episodeId}, defaults: {
                episodeId: episodeId                
            }
        }).then((res) => {
            let moment = res[0];
            moment.name = name;
            return moment.save();
        });
    }

    public findByMomentName = function (momentname) {
        return this.moment.findOne({attributes: this.momentFields, where: {name: momentname}});
    }

    public findByMomentID = function (id) {
        return this.moment.findOne({attributes: this.momentFields, where: {id: id}});
    }

    public findByEpisodeID = function (episodeId) {
        return this.moment.findOne({attributes: this.momentFields, where: {episodeId: episodeId}});
    }

    public removeMomentByID = function (id) {
        return this.moment.destroy({attributes: this.momentFields, where: {id: id}});
    }   

    public init = function () {
        return this.moment.findOrCreate();
    }
}
