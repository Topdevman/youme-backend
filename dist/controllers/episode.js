"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const season_1 = require("../models/season");
const episode_1 = require("../models/episode");
let Season = new season_1.default();
let Episode = new episode_1.default(Season);
function register(req, res) {
    const season_id = req.body.season_id;
    const name = req.body.name;
    Episode.save(season_id, name)
        .then(episode => res.status(201).json(episode))
        .catch(error => res.status(400));
    return;
}
exports.register = register;
function episodes(req, res) {
    if (req.query.season_id) {
        Episode.findBySeasonID(req.query.season_id).then(episode => res.json(episode)).catch(error => res.send(error));
    }
    else if (req.query.episode_id) {
        Episode.findByEpisodeID(req.query.epsode_id).then(episode => res.json(episode)).catch(error => res.send(error));
    }
    else if (req.query.name) {
        Episode.findByEpisodeName(req.query.name).then(episode => res.json(episode)).catch(error => res.send(error));
    }
    else {
        Episode.loadAll().then(episode => res.json(episode)).catch(error => res.send(error));
    }
}
exports.episodes = episodes;
function remove(req, res) {
    let id = req.params._id;
    Episode.removeEpisodeByID(id).then(episode => res.json(episode));
}
exports.remove = remove;
function checkEpisodeExist(req, res, next) {
    let id = req.body.episode_id;
    Episode.findByEpisodeID(id)
        .then((episode) => {
        res.status(201);
        next();
    })
        .catch(error => res.send(error));
    return;
}
exports.checkEpisodeExist = checkEpisodeExist;
