"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const season_1 = require("../models/season");
const episode_1 = require("../models/episode");
const moment_1 = require("../models/moment");
const step_1 = require("../models/step");
let Season = new season_1.default();
let Episode = new episode_1.default(Season);
let Moment = new moment_1.default(Episode);
let Step = new step_1.default(Moment);
function register(req, res) {
    const moment_id = req.body.moment_id;
    const name = req.body.name;
    Step.save(moment_id, name)
        .then(step => res.status(201).json(step))
        .catch(error => res.status(400));
    return;
}
exports.register = register;
function steps(req, res) {
    if (req.query.moment_id) {
        Step.findByMomentID(req.query.moment_id).then(step => res.json(step)).catch(error => res.send(error));
    }
    else if (req.query.step_id) {
        Step.findByStepID(req.query.step_id).then(step => res.json(step)).catch(error => res.send(error));
    }
    else if (req.query.name) {
        Step.findByStepName(req.query.name).then(step => res.json(step)).catch(error => res.send(error));
    }
    else {
        Step.loadAll().then(step => res.json(step)).catch(error => res.send(error));
    }
}
exports.steps = steps;
function remove(req, res) {
    let id = req.params._id;
    Step.removeStepByID(id).then(step => res.json(step));
}
exports.remove = remove;
function checkStepExist(req, res, next) {
    let id = req.body.step_id;
    Step.findByStepID(id)
        .then((step) => {
        res.status(201);
        next();
    })
        .catch(error => res.send(error));
    return;
}
exports.checkStepExist = checkStepExist;
