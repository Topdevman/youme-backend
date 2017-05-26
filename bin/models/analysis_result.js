"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const Sequelize = require("sequelize");
const step_1 = require("./step");
const user_1 = require("./user");
class AnalysisResult {
    constructor() {
        AnalysisResult.analysis_result = index_1.default.define('analysis_resultes', {
            id: { primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 },
            name: { type: Sequelize.STRING, unique: true },
            result: { type: Sequelize.JSONB },
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
        return this.analysis_result.findAll({ attributes: this.analysis_result_Fields });
    }
    static save(stepId, userId, name, result) {
        return this.analysis_result.findOrCreate({
            where: { stepId: stepId, userId: userId }, defaults: {
                stepId: stepId,
                userId: userId
            }
        }).then((res) => {
            let analysis_result = res[0];
            analysis_result.name = name;
            analysis_result.result = result;
            return analysis_result.save();
        });
    }
    static findByAnalysisResultName(analysis_result_name) {
        return this.analysis_result.findOne({ attributes: this.analysis_result_Fields, where: { name: analysis_result_name } });
    }
    static findByAnalysisResultID(id) {
        return this.analysis_result.findOne({ attributes: this.analysis_result_Fields, where: { id: id } });
    }
    static findByStepID(stepId) {
        return this.analysis_result.findOne({ attributes: this.analysis_result_Fields, where: { step_id: stepId } });
    }
    static findByUserID(userId) {
        return this.analysis_result.findOne({ attributes: this.analysis_result_Fields, where: { userId: userId } });
    }
    static removeAnalysisResultByID(id) {
        return this.analysis_result.destroy({ attributes: this.analysis_result_Fields, where: { id: id } });
    }
    static init() {
        return this.analysis_result.findOrCreate();
    }
}
AnalysisResult.analysis_result_Fields = ['id', 'name', 'result', 'step_id', 'created_at', 'updated_at'];
exports.AnalysisResult = AnalysisResult;
