import sequelize from './index';
import * as Sequelize from 'sequelize';
import * as _ from 'lodash';
import { Step } from './step';
import { User } from './user';

export class AnalysisResult {

    public static analysis_result: any;
    private static analysis_result_Fields = ['id', 'name', 'result' ,'step_id', 'created_at', 'updated_at'];
    
    constructor() {
        AnalysisResult.analysis_result = sequelize.define('analysis_resultes', {            
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

    public static loadAll() {
        return this.analysis_result.findAll({attributes: this.analysis_result_Fields});
    }    

    public static save(stepId : string, userId : string, name : string, result : string) {
        return this.analysis_result.findOrCreate({
            where: {stepId: stepId, userId: userId}, defaults: {
                stepId: stepId,
                userId: userId
            }
        }).then((res : any) => {
            let analysis_result = res[0];
            analysis_result.name = name;
            analysis_result.result = result;
            return analysis_result.save();
        });
    }

    public static findByAnalysisResultName(analysis_result_name : string) {
        return this.analysis_result.findOne({attributes: this.analysis_result_Fields, where: {name: analysis_result_name}});
    }

    public static findByAnalysisResultID(id : string) {
        return this.analysis_result.findOne({attributes: this.analysis_result_Fields, where: {id: id}});
    }

    public static findByStepID(stepId : string) {
        return this.analysis_result.findOne({attributes: this.analysis_result_Fields, where: {step_id: stepId}});
    }

    public static findByUserID(userId : string) {
        return this.analysis_result.findOne({attributes: this.analysis_result_Fields, where: {userId: userId}});
    }

    public static removeAnalysisResultByID(id : string) {
        return this.analysis_result.destroy({attributes: this.analysis_result_Fields, where: {id: id}});
    }   

    public static init() {
        return this.analysis_result.findOrCreate();
    }
}
