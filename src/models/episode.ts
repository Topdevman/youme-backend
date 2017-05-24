import sequelize from './index';
import * as Sequelize from 'sequelize';
import * as _ from 'lodash';
import seasonModel from './season';

export default class Episode {

    private episode: any;
    private episodeFields = ['id', 'name', 'season_id', 'created_at', 'updated_at'];
    
    constructor(private Season: seasonModel) {
        this.episode = sequelize.define('episodes', {            
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

    public loadAll = function () {
        return this.episode.findAll({attributes: this.episodeFields});
    }    

    public save = function (seasonId, name) {
        // return this.saveEpisode(episode).then((episode) => this.prepareForClient(episode));
        return this.episode.findOrCreate({
            where: {userId: seasonId}, defaults: {
                userId: seasonId,
            }
        }).then((res) => {
            let episode = res[0];
            episode.name = name;
            return episode.save();
        });
    }

    public findByEpisodename = function (episodename) {
        return this.episode.findOne({attributes: this.episodeFields, where: {name: episodename}});
    }

    public findByEpisodeID = function (id) {
        return this.episode.findOne({attributes: this.episodeFields, where: {id: id}});
    }

    public findBySeasonID = function (seasonId) {
        return this.episode.findOne({attributes: this.episodeFields, where: {season_id: seasonId}});
    }

    public removeEpisodeByID = function (id) {
        return this.episode.destroy({attributes: this.episodeFields, where: {id: id}});
    }   
}
