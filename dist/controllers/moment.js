"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const season_1 = require("../models/season");
const episode_1 = require("../models/episode");
const moment_1 = require("../models/moment");
let Season = new season_1.default();
let Episode = new episode_1.default(Season);
let Moment = new moment_1.default(Episode);
function register(req, res) {
    const epsode_id = req.body.episode_id;
    const name = req.body.name;
    Moment.save(epsode_id, name)
        .then(moment => res.status(201).json(moment))
        .catch(error => res.status(400));
    return;
}
exports.register = register;
function moments(req, res) {
    if (req.query.episode_id) {
        Moment.findByEpisodeID(req.query.episode_id).then(moment => res.json(moment)).catch(error => res.send(error));
    }
    else if (req.query.moment_id) {
        Moment.findByMomentID(req.query.moment_id).then(moment => res.json(moment)).catch(error => res.send(error));
    }
    else if (req.query.name) {
        Moment.findByMomentname(req.query.name).then(moment => res.json(moment)).catch(error => res.send(error));
    }
    else {
        Moment.loadAll().then(moment => res.json(moment)).catch(error => res.send(error));
    }
}
exports.moments = moments;
function remove(req, res) {
    let id = req.params._id;
    Moment.removeMomentByID(id).then(moment => res.json(moment));
}
exports.remove = remove;
function checkMomentExist(req, res, next) {
    let id = req.body.moment_id;
    Moment.findByMomentID(id)
        .then((moment) => {
        res.status(201);
        next();
    })
        .catch(error => res.send(error));
    return;
}
exports.checkMomentExist = checkMomentExist;
