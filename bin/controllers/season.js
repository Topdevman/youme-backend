"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
const authenticator_1 = require("../middleware/authenticator");
const season_1 = require("../models/season");
class SeasonController extends controller_1.Controller {
    constructor(parentRouter) {
        super('/season', parentRouter);
    }
    register(req, res) {
        season_1.Season.save(req.body).then(season => res.status(201).json(season)).catch(error => res.status(401).send(error));
    }
    seasons(req, res) {
        if (req.query.season_id) {
            season_1.Season.findBySeasonID(req.query.season_id).then(season => res.json(season)).catch(error => res.send(error));
            return;
        }
        else if (req.query.name) {
            season_1.Season.findBySeasonName(req.query.name).then(season => res.json(season)).catch(error => res.send(error));
            return;
        }
        else {
            season_1.Season.loadAll().then(season => res.json(season)).catch(error => res.send(error));
            return;
        }
    }
    remove(req, res) {
        let id = req.params._id;
        season_1.Season.removeSeasonByID(id).then(season => res.json(season));
    }
    static checkSeasonExist(req, res, next) {
        let id = req.body.season_id;
        if (id) {
            season_1.Season.findBySeasonID(id)
                .then((season) => {
                res.status(201);
                next();
            })
                .catch(error => res.send(error));
            return;
        }
        else {
            res.status(401).send("Season ID is null");
        }
    }
}
__decorate([
    controller_1.Controller.post('/', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid])
], SeasonController.prototype, "register", null);
__decorate([
    controller_1.Controller.get('/', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid])
], SeasonController.prototype, "seasons", null);
__decorate([
    controller_1.Controller.delete('/:_id', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid])
], SeasonController.prototype, "remove", null);
exports.SeasonController = SeasonController;
