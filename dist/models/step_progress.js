"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const Sequelize = require("sequelize");
class step_progress {
    constructor(Step, User) {
        this.Step = Step;
        this.User = User;
        this.step_progress_Fields = ['id', 'name', 'step_id', 'created_at', 'updated_at'];
        this.loadAll = function () {
            return this.step_progress.findAll({ attributes: this.step_progress_Fields });
        };
        this.save = function (stepId, userId, name) {
            return this.step_progress.findOrCreate({
                where: { stepId: stepId, userId: userId }, defaults: {
                    stepId: stepId,
                    userId: userId
                }
            }).then((res) => {
                let step_progress = res[0];
                step_progress.name = name;
                return step_progress.save();
            });
        };
        this.findByStep_progressName = function (step_progress_name) {
            return this.step_progress.findOne({ attributes: this.step_progress_Fields, where: { name: step_progress_name } });
        };
        this.findByStep_progressID = function (id) {
            return this.step_progress.findOne({ attributes: this.step_progress_Fields, where: { id: id } });
        };
        this.findByStepID = function (stepId) {
            return this.step_progress.findOne({ attributes: this.step_progress_Fields, where: { step_id: stepId } });
        };
        this.findByUserID = function (userId) {
            return this.step_progress.findOne({ attributes: this.step_progress_Fields, where: { userId: userId } });
        };
        this.removeStep_progressByID = function (id) {
            return this.step_progress.destroy({ attributes: this.step_progress_Fields, where: { id: id } });
        };
        this.init = function () {
            return this.step_progress.findOrCreate();
        };
        this.step_progress = index_1.default.define('step_progresses', {
            id: { primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 },
            name: { type: Sequelize.STRING, unique: true },
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
            createdAt: { type: Sequelize.DATE, field: 'created_at' },
            updatedAt: { type: Sequelize.DATE, field: 'updated_at' }
        }, { freezeTableName: true });
    }
}
exports.default = step_progress;
