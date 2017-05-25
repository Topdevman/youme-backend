import * as sequelize from '../models/index';
import seasonModel from '../models/season';


export function register(req, res) {
    let Season = new seasonModel();
    Season.save(req.body)
        .then(season => res.status(201).json(season));
}

export function seasons(req, res) {
    let Season = new seasonModel();
    Season.loadAll().then(season => res.json(season)).catch(error => res.send(error));
}

export function checkSeasonExist(req, res, next) {
    let id = req.body.season_id;
    let Season = new seasonModel();
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
    let Season = new seasonModel();
    Season.removeSeasonByID(id).then(season => res.json(season));
}
