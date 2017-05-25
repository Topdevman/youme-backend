import sequelize from './index';
import * as Sequelize from 'sequelize';
import * as _ from 'lodash';
import stepModel from './step';
import userModel from './user';

export default class analysis_result {

    public analysis_result: any;
    private analysis_result_Fields = ['id', 'name', 'result' ,'step_id', 'created_at', 'updated_at'];
    
    constructor(private Step: stepModel, private User: userModel) {
        this.analysis_result = sequelize.define('analysis_resultes', {            
            id: {primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4},
            name: {type: Sequelize.STRING, unique: true},
            result: {type: Sequelize.JSONB},
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
        return this.analysis_result.findAll({attributes: this.analysis_result_Fields});
    }    

    public save = function (stepId, userId, name) {
        return this.analysis_result.findOrCreate({
            where: {stepId: stepId, userId: userId}, defaults: {
                stepId: stepId,
                userId: userId
            }
        }).then((res) => {
            let analysis_result = res[0];
            analysis_result.name = name;
            return analysis_result.save();
        });
    }

    public findByAnalysis_resultname = function (analysis_result_name) {
        return this.analysis_result.findOne({attributes: this.analysis_result_Fields, where: {name: analysis_result_name}});
    }

    public findByAnalysis_resultID = function (id) {
        return this.analysis_result.findOne({attributes: this.analysis_result_Fields, where: {id: id}});
    }

    public findByStepID = function (stepId) {
        return this.analysis_result.findOne({attributes: this.analysis_result_Fields, where: {step_id: stepId}});
    }

    public findByUserID = function (userId) {
        return this.analysis_result.findOne({attributes: this.analysis_result_Fields, where: {userId: userId}});
    }

    public removeAnalysis_resultByID = function (id) {
        return this.analysis_result.destroy({attributes: this.analysis_result_Fields, where: {id: id}});
    }   

    public init = function () {
        return this.analysis_result.findOrCreate();
    }
}
