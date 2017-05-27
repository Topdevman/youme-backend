import sequelize from './index';
import * as Sequelize from 'sequelize';
import * as _ from 'lodash';

import { Step } from './step';
import { User } from './user';


export class StepProgress {

    public static step_progress: any;
    private static step_progress_Fields = ['id', 'name', 'step_id', 'created_at', 'updated_at'];
    
    constructor() {
        
        StepProgress.step_progress = sequelize.define('step_progresses', {            
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

    public static loadAll() {

        return this.step_progress.findAll({attributes: this.step_progress_Fields});
    }    

    public static save(stepId : string, userId : string, name : string) {

        return this.step_progress.findOrCreate({
            where: {stepId: stepId, userId: userId},
            defaults: {
                stepId: stepId,
                userId: userId
            }
            }).then((res : any) => {
                let step_progress = res[0];
                step_progress.name = name;
                return step_progress.save();
            });
    }

    public static findByStepProgressName(step_progress_name : string) {
        
        return this.step_progress.findOne({attributes: this.step_progress_Fields, where: {name: step_progress_name}});
    }

    public static findByStepProgressID(id : string) {

        return this.step_progress.findOne({attributes: this.step_progress_Fields, where: {id: id}});
    }

    public static findByStepID(stepId : string) {

        return this.step_progress.findOne({attributes: this.step_progress_Fields, where: {step_id: stepId}});
    }

    public static findByUserID(userId : string) {

        return this.step_progress.findOne({attributes: this.step_progress_Fields, where: {userId: userId}});
    }

    public static removeStepProgressByID(id : string) {

        return this.step_progress.destroy({attributes: this.step_progress_Fields, where: {id: id}});
    }   

    public static init() {

        return this.step_progress.findOrCreate();
    }
}
