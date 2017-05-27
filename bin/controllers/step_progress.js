"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
const user_1 = require("./user");
const step_1 = require("./step");
const authenticator_1 = require("../middleware/authenticator");
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
            step_progress_1.StepProgress.findByStepProgressName(req.query.name).then(step_progress => res.json(step_progress)).catch(error => res.send(error));
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
__decorate([
    controller_1.Controller.post('/', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid, user_1.UserController.checkUserExist, step_1.StepController.checkStepExist])
], StepProgressController.prototype, "register", null);
__decorate([
    controller_1.Controller.get('/', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid])
], StepProgressController.prototype, "StepProgresses", null);
__decorate([
    controller_1.Controller.delete('/:_id', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid])
], StepProgressController.prototype, "remove", null);
exports.StepProgressController = StepProgressController;
