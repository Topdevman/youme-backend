"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
const season_1 = require("./season");
const authenticator_1 = require("../middleware/authenticator");
const episode_1 = require("../models/episode");
class EpisodeController extends controller_1.Controller {
    constructor(parentRouter) {
        super('/episode', parentRouter);
    }
    register(req, res) {
        const season_id = req.body.season_id;
        const name = req.body.name;
        episode_1.Episode.save(season_id, name)
            .then(episode => res.status(201).json(episode))
            .catch(error => res.status(400));
        return;
    }
    episodes(req, res) {
        if (req.query.season_id) {
            episode_1.Episode.findBySeasonID(req.query.season_id).then(episode => res.json(episode)).catch(error => res.send(error));
        }
        else if (req.query.episode_id) {
            episode_1.Episode.findByEpisodeID(req.query.epsode_id).then(episode => res.json(episode)).catch(error => res.send(error));
        }
        else if (req.query.name) {
            episode_1.Episode.findByEpisodeName(req.query.name).then(episode => res.json(episode)).catch(error => res.send(error));
        }
        else {
            episode_1.Episode.loadAll().then(episode => res.json(episode)).catch(error => res.send(error));
        }
    }
    remove(req, res) {
        let id = req.params._id;
        episode_1.Episode.removeEpisodeByID(id).then(episode => res.json(episode));
    }
    static checkEpisodeExist(req, res, next) {
        let id = req.body.episode_id;
        if (id) {
            episode_1.Episode.findByEpisodeID(id)
                .then((episode) => {
                res.status(201);
                next();
            })
                .catch(error => res.send(error));
            return;
        }
        else {
            res.status(400).send("Episode ID is null");
        }
    }
}
__decorate([
    controller_1.Controller.post('/', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid, season_1.SeasonController.checkSeasonExist])
], EpisodeController.prototype, "register", null);
__decorate([
    controller_1.Controller.get('/', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid])
], EpisodeController.prototype, "episodes", null);
__decorate([
    controller_1.Controller.delete('/:_id', [authenticator_1.Authenticator.checkAuthToken, authenticator_1.Authenticator.checkAuthTokenValid])
], EpisodeController.prototype, "remove", null);
exports.EpisodeController = EpisodeController;
