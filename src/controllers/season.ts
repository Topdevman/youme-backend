import * as sequelize from '../models/index';
import seasonModel from '../models/season';

let Season = new seasonModel();

export function register(req, res) {
    
    Season.save(req.body)
        .then(season => res.status(201).json(season));
}

export function seasons(req, res) {
    
    if (req.query.season_id) {
        Season.findBySeasonID(req.query.season_id).then(season => res.json(season)).catch(error => res.send(error));
        return;
    } else if (req.query.name) {
        Season.findBySeasonName(req.query.name).then(season => res.json(season)).catch(error => res.send(error));
        return;
    } else {
        Season.loadAll().then(season => res.json(season)).catch(error => res.send(error));
        return;
    }
}

export function checkSeasonExist(req, res, next) {
    
    let id = req.body.season_id;

    Season.findBySeasonID(id)
        .then((season) => {
            res.status(201);
            next();
        })
        .catch(error => res.send(error));
    return;
}

export function remove(req, res) {
    
    let id = req.params._id;    
    Season.removeSeasonByID(id).then(season => res.json(season));
}
