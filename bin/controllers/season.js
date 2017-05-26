"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
const season_1 = require("../models/season");
class SeasonController extends controller_1.Controller {
    constructor(parentRouter) {
        super('/season', parentRouter);
    }
    register(req, res) {
        season_1.Season.save(req.body)
            .then(season => res.status(201).json(season));
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
    checkSeasonExist(req, res, next) {
        let id = req.body.season_id;
        season_1.Season.findBySeasonID(id)
            .then((season) => {
            res.status(201);
            next();
        })
            .catch(error => res.send(error));
        return;
    }
    remove(req, res) {
        let id = req.params._id;
        season_1.Season.removeSeasonByID(id).then(season => res.json(season));
    }
}
exports.SeasonController = SeasonController;
