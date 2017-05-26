"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const season_1 = require("../models/season");
const episode_1 = require("../models/episode");
const moment_1 = require("../models/moment");
const step_1 = require("../models/step");
const analysis_result_1 = require("../models/analysis_result");
let User = new user_1.default();
let Season = new season_1.default();
let Episode = new episode_1.default(Season);
let Moment = new moment_1.default(Episode);
let Step = new step_1.default(Moment);
let Analysis_result = new analysis_result_1.default(Step, User);
function register(req, res) {
    const step_id = req.body.step_id;
    const user_id = req.body.user_id;
    const name = req.body.name;
    const result = req.body.result;
    Analysis_result.save(step_id, user_id, name, result)
        .then(analysis_result => res.status(201).json(analysis_result))
        .catch(error => res.status(400));
    return;
}
exports.register = register;
function analysis_results(req, res) {
    if (req.query.step_id) {
        Analysis_result.findByStepID(req.query.step_id).then(analysis_result => res.json(analysis_result)).catch(error => res.send(error));
    }
    else if (req.query.user_id) {
        Analysis_result.findByUserID(req.query.user_id).then(analysis_result => res.json(analysis_result)).catch(error => res.send(error));
    }
    else if (req.query.analysis_result_id) {
        Analysis_result.findByUserID(req.query.analysis_result_id).then(analysis_result => res.json(analysis_result)).catch(error => res.send(error));
    }
    else if (req.query.name) {
        Analysis_result.findByAnalysis_resultName(req.query.name).then(analysis_result => res.json(analysis_result)).catch(error => res.send(error));
    }
    else {
        Analysis_result.loadAll().then(analysys_result => res.json(analysys_result)).catch(error => res.send(error));
    }
}
exports.analysis_results = analysis_results;
function remove(req, res) {
    let id = req.params._id;
    Analysis_result.removeAnalysis_resultByID(id).then(analysis_result => res.json(analysis_result));
}
exports.remove = remove;
