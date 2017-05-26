"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
const analysis_result_1 = require("../models/analysis_result");
class AnalysisResultController extends controller_1.Controller {
    constructor(parentRouter) {
        super('/analysis', parentRouter);
    }
    register(req, res) {
        const step_id = req.body.step_id;
        const user_id = req.body.user_id;
        const name = req.body.name;
        const result = req.body.result;
        analysis_result_1.AnalysisResult.save(step_id, user_id, name, result)
            .then(analysis_result => res.status(201).json(analysis_result))
            .catch(error => res.status(400));
        return;
    }
    analysis_results(req, res) {
        if (req.query.step_id) {
            analysis_result_1.AnalysisResult.findByStepID(req.query.step_id).then(analysis_result => res.json(analysis_result)).catch(error => res.send(error));
        }
        else if (req.query.user_id) {
            analysis_result_1.AnalysisResult.findByUserID(req.query.user_id).then(analysis_result => res.json(analysis_result)).catch(error => res.send(error));
        }
        else if (req.query.analysis_result_id) {
            analysis_result_1.AnalysisResult.findByUserID(req.query.analysis_result_id).then(analysis_result => res.json(analysis_result)).catch(error => res.send(error));
        }
        else if (req.query.name) {
            analysis_result_1.AnalysisResult.findByAnalysisResultName(req.query.name).then(analysis_result => res.json(analysis_result)).catch(error => res.send(error));
        }
        else {
            analysis_result_1.AnalysisResult.loadAll().then(analysys_result => res.json(analysys_result)).catch(error => res.send(error));
        }
    }
    remove(req, res) {
        let id = req.params._id;
        analysis_result_1.AnalysisResult.removeAnalysisResultByID(id).then(analysis_result => res.json(analysis_result));
    }
}
exports.AnalysisResultController = AnalysisResultController;
