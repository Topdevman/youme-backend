"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const season_1 = require("../models/season");
let Season = new season_1.default();
function register(req, res) {
    Season.save(req.body)
        .then(season => res.status(201).json(season));
}
exports.register = register;
function seasons(req, res) {
    Season.loadAll().then(season => res.json(season)).catch(error => res.send(error));
}
exports.seasons = seasons;
function checkSeasonExist(req, res, next) {
    let id = req.body.season_id;
    Season.findBySeasonID(id)
        .then((season) => {
        res.status(201);
        next();
    })
        .catch(error => res.send(error));
    return;
}
exports.checkSeasonExist = checkSeasonExist;
function remove(req, res) {
    let id = req.params._id;
    Season.removeSeasonByID(id).then(season => res.json(season));
}
exports.remove = remove;
