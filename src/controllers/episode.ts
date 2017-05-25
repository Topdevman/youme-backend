import seasonModel from '../models/season';
import * as sequelize from '../models/index';
import episodeModel from '../models/episode';

let Season = new seasonModel();
let Episode = new episodeModel(Season);

export function register(req, res) {
    
    const season_id = req.body.season_id;
    const name = req.body.name;
    Episode.save(season_id, name)
        .then(episode => res.status(201).json(episode))
        .catch(error => res.status(400));
    return;
}

export function episodes(req, res) {
   
    if (req.query.season_id) {
        Episode.findBySeasonID(req.query.season_id).then(episode => res.json(episode)).catch(error => res.send(error));
    } else if (req.query.episode_id) {
        Episode.findByEpisodeID(req.query.epsode_id).then(episode => res.json(episode)).catch(error => res.send(error));
    } else if (req.query.name) {
        Episode.findByEpisodename(req.query.name).then(episode => res.json(episode)).catch(error => res.send(error));
    } else {
        Episode.loadAll().then(episode => res.json(episode)).catch(error => res.send(error));
    }
}

export function remove(req, res) {
    
    let id = req.params._id;    
    Episode.removeEpisodeByID(id).then(episode => res.json(episode));
}

export function checkEpisodeExist(req, res, next) {
    let id = req.body.episode_id;
    
    Episode.findByEpisodeID(id)
        .then((episode) => {
            res.status(201);
            next();
        })
        .catch(error => res.send(error));
    return;
}