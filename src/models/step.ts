import sequelize from './index';
import * as Sequelize from 'sequelize';
import * as _ from 'lodash';
import momentModel from './moment';

export default class Step {

    public step: any;
    private stepFields = ['id', 'name', 'moment_id', 'created_at', 'updated_at'];
    
    constructor(private Moment: momentModel) {
        this.step = sequelize.define('steps', {            
            id: {primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4},
            name: {type: Sequelize.STRING, unique: true},
            momentId: {
                model: Moment.moment,
                type: Sequelize.STRING,
                field: "moment_id",
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
        return this.step.findAll({attributes: this.stepFields});
    }    

    public save = function (momentId, name) {
        // return this.savestep(step).then((step) => this.prepareForClient(step));
        return this.step.findOrCreate({
            where: {momentId: momentId}, defaults: {
                momentId: momentId,
            }
        }).then((res) => {
            let step = res[0];
            step.name = name;
            return step.save();
        });
    }

    public findByStepname = function (stepname) {
        return this.step.findOne({attributes: this.stepFields, where: {name: stepname}});
    }

    public findByStepID = function (id) {
        return this.step.findOne({attributes: this.stepFields, where: {id: id}});
    }

    public findByMomentID = function (momentId) {
        return this.step.findOne({attributes: this.stepFields, where: {moment_id: momentId}});
    }

    public removeStepByID = function (id) {
        return this.step.destroy({attributes: this.stepFields, where: {id: id}});
    }   

    public init = function () {
        return this.step.findOrCreate();
    }
}
