import sequelize from './index';
import * as Sequelize from 'sequelize';
import * as _ from 'lodash';

import { Moment } from './moment';


export class Step {

    public static step: any;
    private static stepFields = ['id', 'name', 'moment_id', 'created_at', 'updated_at'];
    
    constructor() {

        Step.step = sequelize.define('steps', {            
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

    public static loadAll() {

        return this.step.findAll({attributes: this.stepFields});
    }    

    public static save(momentId : string, name : string) {
        
        return this.step.findOrCreate({
            where: {momentId: momentId},
            defaults: {momentId: momentId}
            }).then((res : any) => {
                let step = res[0];
                step.name = name;
                return step.save();
            });
    }

    public static findByStepName(stepname : string) {

        return this.step.findOne({attributes: this.stepFields, where: {name: stepname}});
    }

    public static findByStepID(id : string) {

        return this.step.findOne({attributes: this.stepFields, where: {id: id}});
    }

    public static findByMomentID(momentId : string) {

        return this.step.findOne({attributes: this.stepFields, where: {moment_id: momentId}});
    }

    public static removeStepByID(id : string) {

        return this.step.destroy({attributes: this.stepFields, where: {id: id}});
    }   

    public static init() {

        return this.step.findOrCreate();
    }
}
