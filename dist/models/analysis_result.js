"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const Sequelize = require("sequelize");
class analysis_result {
    constructor(Step, User) {
        this.Step = Step;
        this.User = User;
        this.analysis_result_Fields = ['id', 'name', 'result', 'step_id', 'created_at', 'updated_at'];
        this.loadAll = function () {
            return this.analysis_result.findAll({ attributes: this.analysis_result_Fields });
        };
        this.save = function (stepId, userId, name) {
            return this.analysis_result.findOrCreate({
                where: { stepId: stepId, userId: userId }, defaults: {
                    stepId: stepId,
                    userId: userId
                }
            }).then((res) => {
                let analysis_result = res[0];
                analysis_result.name = name;
                return analysis_result.save();
            });
        };
        this.findByAnalysis_resultname = function (analysis_result_name) {
            return this.analysis_result.findOne({ attributes: this.analysis_result_Fields, where: { name: analysis_result_name } });
        };
        this.findByAnalysis_resultID = function (id) {
            return this.analysis_result.findOne({ attributes: this.analysis_result_Fields, where: { id: id } });
        };
        this.findByStepID = function (stepId) {
            return this.analysis_result.findOne({ attributes: this.analysis_result_Fields, where: { step_id: stepId } });
        };
        this.findByUserID = function (userId) {
            return this.analysis_result.findOne({ attributes: this.analysis_result_Fields, where: { userId: userId } });
        };
        this.removeAnalysis_resultByID = function (id) {
            return this.analysis_result.destroy({ attributes: this.analysis_result_Fields, where: { id: id } });
        };
        this.init = function () {
            return this.analysis_result.findOrCreate();
        };
        this.analysis_result = index_1.default.define('analysis_resultes', {
            id: { primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 },
            name: { type: Sequelize.STRING, unique: true },
            result: { type: Sequelize.JSONB },
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
exports.default = analysis_result;
