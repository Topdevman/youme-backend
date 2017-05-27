"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const Sequelize = require("sequelize");
const moment_1 = require("./moment");
class Step {
    constructor() {
        Step.step = index_1.default.define('steps', {
            id: { primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 },
            name: { type: Sequelize.STRING, unique: true },
            momentId: {
                model: moment_1.Moment.moment,
                type: Sequelize.STRING,
                field: "moment_id",
                key: 'id',
                unique: true,
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            createdAt: { type: Sequelize.DATE, field: 'created_at' },
            updatedAt: { type: Sequelize.DATE, field: 'updated_at' }
        }, { freezeTableName: true });
    }
    static loadAll() {
        return this.step.findAll({ attributes: this.stepFields });
    }
    static save(momentId, name) {
        return this.step.findOrCreate({
            where: { momentId: momentId },
            defaults: { momentId: momentId }
        }).then((res) => {
            let step = res[0];
            step.name = name;
            return step.save();
        });
    }
    static findByStepName(stepname) {
        return this.step.findOne({ attributes: this.stepFields, where: { name: stepname } });
    }
    static findByStepID(id) {
        return this.step.findOne({ attributes: this.stepFields, where: { id: id } });
    }
    static findByMomentID(momentId) {
        return this.step.findOne({ attributes: this.stepFields, where: { moment_id: momentId } });
    }
    static removeStepByID(id) {
        return this.step.destroy({ attributes: this.stepFields, where: { id: id } });
    }
    static init() {
        return this.step.findOrCreate();
    }
}
Step.stepFields = ['id', 'name', 'moment_id', 'created_at', 'updated_at'];
exports.Step = Step;
