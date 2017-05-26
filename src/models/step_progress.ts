import sequelize from './index';
import * as Sequelize from 'sequelize';
import * as _ from 'lodash';
import stepModel from './step';
import userModel from './user';

export default class step_progress {

    public step_progress: any;
    private step_progress_Fields = ['id', 'name', 'step_id', 'created_at', 'updated_at'];
    
    constructor(private Step: stepModel, private User: userModel) {
        this.step_progress = sequelize.define('step_progresses', {            
            id: {primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4},
            name: {type: Sequelize.STRING, unique: true},
            userId: {
                model: User.user,
                type: Sequelize.STRING,
                field: "user_id",
                key: 'id',
                unique: true,
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            stepId: {
                model: Step.step,
                type: Sequelize.STRING,
                field: "step_id",
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
        return this.step_progress.findAll({attributes: this.step_progress_Fields});
    }    

    public save = function (stepId, userId, name) {
        return this.step_progress.findOrCreate({
            where: {stepId: stepId, userId: userId}, defaults: {
                stepId: stepId,
                userId: userId
            }
        }).then((res) => {
            let step_progress = res[0];
            step_progress.name = name;
            return step_progress.save();
        });
    }

    public findByStep_progressName = function (step_progress_name) {
        return this.step_progress.findOne({attributes: this.step_progress_Fields, where: {name: step_progress_name}});
    }

    public findByStep_progressID = function (id) {
        return this.step_progress.findOne({attributes: this.step_progress_Fields, where: {id: id}});
    }

    public findByStepID = function (stepId) {
        return this.step_progress.findOne({attributes: this.step_progress_Fields, where: {step_id: stepId}});
    }

    public findByUserID = function (userId) {
        return this.step_progress.findOne({attributes: this.step_progress_Fields, where: {userId: userId}});
    }

    public removeStep_progressByID = function (id) {
        return this.step_progress.destroy({attributes: this.step_progress_Fields, where: {id: id}});
    }   

    public init = function () {
        return this.step_progress.findOrCreate();
    }
}
