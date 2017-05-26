"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const Sequelize = require("sequelize");
class Step {
    constructor(Moment) {
        this.Moment = Moment;
        this.stepFields = ['id', 'name', 'moment_id', 'created_at', 'updated_at'];
        this.loadAll = function () {
            return this.step.findAll({ attributes: this.stepFields });
        };
        this.save = function (momentId, name) {
            return this.step.findOrCreate({
                where: { momentId: momentId }, defaults: {
                    momentId: momentId,
                }
            }).then((res) => {
                let step = res[0];
                step.name = name;
                return step.save();
            });
        };
        this.findByStepName = function (stepname) {
            return this.step.findOne({ attributes: this.stepFields, where: { name: stepname } });
        };
        this.findByStepID = function (id) {
            return this.step.findOne({ attributes: this.stepFields, where: { id: id } });
        };
        this.findByMomentID = function (momentId) {
            return this.step.findOne({ attributes: this.stepFields, where: { moment_id: momentId } });
        };
        this.removeStepByID = function (id) {
            return this.step.destroy({ attributes: this.stepFields, where: { id: id } });
        };
        this.init = function () {
            return this.step.findOrCreate();
        };
        this.step = index_1.default.define('steps', {
            id: { primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 },
            name: { type: Sequelize.STRING, unique: true },
            momentId: {
                model: Moment.moment,
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
}
exports.default = Step;
