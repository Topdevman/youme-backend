"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const Sequelize = require("sequelize");
const step_1 = require("./step");
const user_1 = require("./user");
class StepProgress {
    constructor() {
        StepProgress.step_progress = index_1.default.define('step_progresses', {
            id: { primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 },
            name: { type: Sequelize.STRING, unique: true },
            userId: {
                model: user_1.User.user,
                type: Sequelize.STRING,
                field: "user_id",
                key: 'id',
                unique: true,
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            stepId: {
                model: step_1.Step.step,
                type: Sequelize.STRING,
                field: "step_id",
                key: 'id',
                unique: true,
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            createdAt: { type: Sequelize.DATE, field: 'created_at' },
            updatedAt: { type: Sequelize.DATE, field: 'updated_at' }
        }, { freezeTableName: true });
    }
    static loadAll() {
        return this.step_progress.findAll({ attributes: this.step_progress_Fields });
    }
    static save(stepId, userId, name) {
        return this.step_progress.findOrCreate({
            where: { stepId: stepId, userId: userId },
            defaults: {
                stepId: stepId,
                userId: userId
            }
        }).then((res) => {
            let step_progress = res[0];
            step_progress.name = name;
            return step_progress.save();
        });
    }
    static findByStepProgressName(step_progress_name) {
        return this.step_progress.findOne({ attributes: this.step_progress_Fields, where: { name: step_progress_name } });
    }
    static findByStepProgressID(id) {
        return this.step_progress.findOne({ attributes: this.step_progress_Fields, where: { id: id } });
    }
    static findByStepID(stepId) {
        return this.step_progress.findOne({ attributes: this.step_progress_Fields, where: { step_id: stepId } });
    }
    static findByUserID(userId) {
        return this.step_progress.findOne({ attributes: this.step_progress_Fields, where: { userId: userId } });
    }
    static removeStepProgressByID(id) {
        return this.step_progress.destroy({ attributes: this.step_progress_Fields, where: { id: id } });
    }
    static init() {
        return this.step_progress.findOrCreate();
    }
}
StepProgress.step_progress_Fields = ['id', 'name', 'step_id', 'created_at', 'updated_at'];
exports.StepProgress = StepProgress;
