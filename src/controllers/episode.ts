import seasonModel from '../models/season';
import * as sequelize from '../models/index';
import episodeModel from '../models/episode';


export function register(req, res) {
    let Season = new seasonModel();
    let Episode = new episodeModel(Season);
    const season_id = req.body.season_id;
    const epname = req.body.epname;
    Episode.save(season_id, epname)
        .then(episode => res.status(201).json(episode));
}

export function episodes(req, res) {
    let Season = new seasonModel();
    let Episode = new episodeModel(Season);
    if (req.query.season_id) {
        Episode.findBySeasonID(req.query.season_id).then(episode => res.json(episode)).catch(error => res.send(error));
    } else if (req.query.episode_id) {
        Episode.findByEpisodeID(req.query.epsode_id).then(episode => res.json(episode)).catch(error => res.send(error));
    } else if (req.query.episode_name) {
        Episode.findByEpisodename(req.query.episode_name).then(episode => res.json(episode)).catch(error => res.send(error));
    } else {
        Episode.loadAll().then(episode => res.json(episode)).catch(error => res.send(error));
    }
}

export function remove(req, res) {
    let id = req.params._id;
    let Season = new seasonModel();
    let Episode = new episodeModel(Season);
    Episode.removeEpisodeByID(id).then(episode => res.json(episode));
}