"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const season_1 = require("../models/season");
function register(req, res) {
    let Season = new season_1.default();
    Season.save(req.body)
        .then(season => res.status(201).json(season));
}
exports.register = register;
function seasons(req, res) {
    let Season = new season_1.default();
    Season.loadAll().then(season => res.json(season)).catch(error => res.send(error));
}
exports.seasons = seasons;
function checkSeasonExist(req, res, next) {
    let id = req.body.season_id;
    let Season = new season_1.default();
    Season.findBySeasonID(id)
        .then((season) => {
        res.json(season);
        next();
    })
        .catch(error => res.send(error));
}
exports.checkSeasonExist = checkSeasonExist;
function remove(req, res) {
    let id = req.params._id;
    let Season = new season_1.default();
    Season.removeSeasonByID(id).then(season => res.json(season));
}
exports.remove = remove;
