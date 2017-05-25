"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const season_1 = require("../models/season");
const episode_1 = require("../models/episode");
const moment_1 = require("../models/moment");
const step_1 = require("../models/step");
const step_progress_1 = require("../models/step_progress");
let User = new user_1.default();
let Season = new season_1.default();
let Episode = new episode_1.default(Season);
let Moment = new moment_1.default(Episode);
let Step = new step_1.default(Moment);
let Step_progress = new step_progress_1.default(Step, User);
function register(req, res) {
    const step_id = req.body.step_id;
    const user_id = req.body.user_id;
    const name = req.body.name;
    Step_progress.save(step_id, user_id, name)
        .then(step_progress => res.status(201).json(step_progress))
        .catch(error => res.status(400));
    return;
}
exports.register = register;
function step_progresses(req, res) {
    if (req.query.step_id) {
        Step_progress.findByStepID(req.query.step_id).then(step_progress => res.json(step_progress)).catch(error => res.send(error));
    }
    else if (req.query.user_id) {
        Step_progress.findByUserID(req.query.user_id).then(step_progress => res.json(step_progress)).catch(error => res.send(error));
    }
    else if (req.query.step_progress_id) {
        Step_progress.findByStep_progressID(req.query.step_progress_id).then(step_progress => res.json(step_progress)).catch(error => res.send(error));
    }
    else if (req.query.name) {
        Step_progress.findByStep_progressname(req.query.name).then(step_progress => res.json(step_progress)).catch(error => res.send(error));
    }
    else {
        Step_progress.loadAll().then(step_progress => res.json(step_progress)).catch(error => res.send(error));
    }
}
exports.step_progresses = step_progresses;
function remove(req, res) {
    let id = req.params._id;
    Step_progress.removeStep_progressByID(id).then(step_progress => res.json(step_progress));
}
exports.remove = remove;
