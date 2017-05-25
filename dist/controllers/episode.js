"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const season_1 = require("../models/season");
const episode_1 = require("../models/episode");
function register(req, res) {
    let Season = new season_1.default();
    let Episode = new episode_1.default(Season);
    const season_id = req.body.season_id;
    const epname = req.body.epname;
    Episode.save(season_id, epname)
        .then(episode => res.status(201).json(episode))
        .catch(error => res.status(400));
    return;
}
exports.register = register;
function episodes(req, res) {
    let Season = new season_1.default();
    let Episode = new episode_1.default(Season);
    if (req.query.season_id) {
        Episode.findBySeasonID(req.query.season_id).then(episode => res.json(episode)).catch(error => res.send(error));
    }
    else if (req.query.episode_id) {
        Episode.findByEpisodeID(req.query.epsode_id).then(episode => res.json(episode)).catch(error => res.send(error));
    }
    else if (req.query.episode_name) {
        Episode.findByEpisodename(req.query.episode_name).then(episode => res.json(episode)).catch(error => res.send(error));
    }
    else {
        Episode.loadAll().then(episode => res.json(episode)).catch(error => res.send(error));
    }
}
exports.episodes = episodes;
function remove(req, res) {
    let id = req.params._id;
    let Season = new season_1.default();
    let Episode = new episode_1.default(Season);
    Episode.removeEpisodeByID(id).then(episode => res.json(episode));
}
exports.remove = remove;
