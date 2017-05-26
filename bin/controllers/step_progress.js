"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
const step_progress_1 = require("../models/step_progress");
class StepProgressController extends controller_1.Controller {
    constructor(parentRouter) {
        super('/progress', parentRouter);
    }
    register(req, res) {
        const step_id = req.body.step_id;
        const user_id = req.body.user_id;
        const name = req.body.name;
        step_progress_1.StepProgress.save(step_id, user_id, name)
            .then(step_progress => res.status(201).json(step_progress))
            .catch(error => res.status(400));
        return;
    }
    StepProgresses(req, res) {
        if (req.query.step_id) {
            step_progress_1.StepProgress.findByStepID(req.query.step_id).then(step_progress => res.json(step_progress)).catch(error => res.send(error));
        }
        else if (req.query.user_id) {
            step_progress_1.StepProgress.findByUserID(req.query.user_id).then(step_progress => res.json(step_progress)).catch(error => res.send(error));
        }
        else if (req.query.StepProgress_id) {
            step_progress_1.StepProgress.findByStepProgressID(req.query.step_progress_id).then(step_progress => res.json(step_progress)).catch(error => res.send(error));
        }
        else if (req.query.name) {
            step_progress_1.StepProgress.findByStepProgressName(req.query.name).then(StepProgress => res.json(step_progress)).catch(error => res.send(error));
        }
        else {
            step_progress_1.StepProgress.loadAll().then(step_progress => res.json(step_progress)).catch(error => res.send(error));
        }
    }
    remove(req, res) {
        let id = req.params._id;
        step_progress_1.StepProgress.removeStepProgressByID(id).then(step_progress => res.json(step_progress));
    }
}
exports.StepProgressController = StepProgressController;
