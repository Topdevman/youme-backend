import seasonModel from '../models/season';
import * as sequelize from '../models/index';
import episodeModel from '../models/episode';
import momentModel from '../models/moment';

let Season = new seasonModel();
let Episode = new episodeModel(Season);
let Moment = new momentModel(Episode);

export function register(req, res) {
   
    const epsode_id = req.body.episode_id;
    const name = req.body.name;
    Moment.save(epsode_id, name)
        .then(moment => res.status(201).json(moment))
        .catch(error => res.status(400));
    return;
}

export function moments(req, res) {
   
    if (req.query.episode_id) {
        Moment.findByEpisodeID(req.query.episode_id).then(moment => res.json(moment)).catch(error => res.send(error));
    } else if (req.query.moment_id) {
        Moment.findByMomentID(req.query.moment_id).then(moment => res.json(moment)).catch(error => res.send(error));
    } else if (req.query.name) {
        Moment.findByMomentname(req.query.name).then(moment => res.json(moment)).catch(error => res.send(error));
    } else {
        Moment.loadAll().then(moment => res.json(moment)).catch(error => res.send(error));
    }
}

export function remove(req, res) {
    
    let id = req.params._id;    
    Moment.removeMomentByID(id).then(moment => res.json(moment));
}

export function checkMomentExist(req, res, next) {
    let id = req.body.moment_id;
    
    Moment.findByMomentID(id)
        .then((moment) => {
            res.status(201);
            next();
        })
        .catch(error => res.send(error));
    return;
}