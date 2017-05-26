"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
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
    checkEpisodeExist(req, res, next) {
        let id = req.body.episode_id;
        episode_1.Episode.findByEpisodeID(id)
            .then((episode) => {
            res.status(201);
            next();
        })
            .catch(error => res.send(error));
        return;
    }
}
exports.EpisodeController = EpisodeController;
