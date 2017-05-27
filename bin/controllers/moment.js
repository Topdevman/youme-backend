"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
const episode_1 = require("./episode");
const authenticator_1 = require("../middleware/authenticator");
const moment_1 = require("../models/moment");
class MomentController extends controller_1.Controller {
    constructor(parentRouter) {
        super('/moment', parentRouter);
    }
    register(req, res) {
        const epsode_id = req.body.episode_id;
        const name = req.body.name;
        moment_1.Moment.save(epsode_id, name)
            .then(moment => res.status(201).json(moment))
            .catch(error => res.status(400));
        return;
    }
    moments(req, res) {
        if (req.query.episode_id) {
            moment_1.Moment.findByEpisodeID(req.query.episode_id).then(moment => res.json(moment)).catch(error => res.send(error));
        }
        else if (req.query.moment_id) {
            moment_1.Moment.findByMomentID(req.query.moment_id).then(moment => res.json(moment)).catch(error => res.send(error));
        }
        else if (req.query.name) {
            moment_1.Moment.findByMomentName(req.query.name).then(moment => res.json(moment)).catch(error => res.send(error));
        }
        else {
            moment_1.Moment.loadAll().then(moment => res.json(moment)).catch(error => res.send(error));
        }
    }
    remove(req, res) {
        console.log(req.params._id);
        let id = req.params._id;
        moment_1.Moment.removeMomentByID(id).then(moment => res.json(moment)).catch(error => res.send(error));
    }
    static checkMomentExist(req, res, next) {
        let id = req.body.moment_id;
        if (id) {
            moment_1.Moment.findByMomentID(id)
                .then((moment) => {
                res.status(201);
                next();
            })
                .catch(error => res.send(error));
            return;
        }
        else {
            res.status(401).send('Moment ID is null');
        }
    }
}
__decorate([
    controller_1.Controller.post('/', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid, episode_1.EpisodeController.checkEpisodeExist])
], MomentController.prototype, "register", null);
__decorate([
    controller_1.Controller.get('/', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid])
], MomentController.prototype, "moments", null);
__decorate([
    controller_1.Controller.delete('/:_id', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid])
], MomentController.prototype, "remove", null);
exports.MomentController = MomentController;
