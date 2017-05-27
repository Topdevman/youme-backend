"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
const moment_1 = require("./moment");
const authenticator_1 = require("../middleware/authenticator");
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
    static checkStepExist(req, res, next) {
        let id = req.body.step_id;
        if (id) {
            step_1.Step.findByStepID(id)
                .then((step) => {
                res.status(201);
                next();
            })
                .catch(error => res.send(error));
            return;
        }
        else {
            res.status(401).send('Step ID is null');
        }
    }
}
__decorate([
    controller_1.Controller.post('/', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid, moment_1.MomentController.checkMomentExist])
], StepController.prototype, "register", null);
__decorate([
    controller_1.Controller.get('/', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid])
], StepController.prototype, "steps", null);
__decorate([
    controller_1.Controller.delete('/:_id', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid])
], StepController.prototype, "remove", null);
exports.StepController = StepController;
