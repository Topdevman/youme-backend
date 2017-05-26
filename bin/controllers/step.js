"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
const step_1 = require("../models/step");
class StepController extends controller_1.Controller {
    constructor(parentRouter) {
        super('/step', parentRouter);
    }
    register(req, res) {
        const moment_id = req.body.moment_id;
        const name = req.body.name;
        step_1.Step.save(moment_id, name)
            .then(step => res.status(201).json(step))
            .catch(error => res.status(400));
        return;
    }
    steps(req, res) {
        if (req.query.moment_id) {
            step_1.Step.findByMomentID(req.query.moment_id).then(step => res.json(step)).catch(error => res.send(error));
        }
        else if (req.query.step_id) {
            step_1.Step.findByStepID(req.query.step_id).then(step => res.json(step)).catch(error => res.send(error));
        }
        else if (req.query.name) {
            step_1.Step.findByStepName(req.query.name).then(step => res.json(step)).catch(error => res.send(error));
        }
        else {
            step_1.Step.loadAll().then(step => res.json(step)).catch(error => res.send(error));
        }
    }
    remove(req, res) {
        let id = req.params._id;
        step_1.Step.removeStepByID(id).then(step => res.json(step));
    }
    checkStepExist(req, res, next) {
        let id = req.body.step_id;
        step_1.Step.findByStepID(id)
            .then((step) => {
            res.status(201);
            next();
        })
            .catch(error => res.send(error));
        return;
    }
}
exports.StepController = StepController;
