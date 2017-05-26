"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
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
        let id = req.params._id;
        moment_1.Moment.removeMomentByID(id).then(moment => res.json(moment));
    }
    checkMomentExist(req, res, next) {
        let id = req.body.moment_id;
        moment_1.Moment.findByMomentID(id)
            .then((moment) => {
            res.status(201);
            next();
        })
            .catch(error => res.send(error));
        return;
    }
}
exports.MomentController = MomentController;
