import { Router, Request, Response } from '@types/express';

import { Controller } from './controller';
import { SeasonController } from './season';

import { Authenticator } from '../middleware/authenticator';

import { Episode } from '../models/episode';


export class EpisodeController extends Controller {

    constructor(parentRouter : Router) {
        
        super('/episode', parentRouter);
    }
    
    @Controller.post('/', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid, SeasonController.checkSeasonExist])
    private register(req, res) {
        
        const season_id = req.body.season_id;
        const name = req.body.name;
        Episode.save(season_id, name)
            .then(episode => res.status(201).json(episode))
            .catch(error => res.status(400));
        return;
    }

    @Controller.get('/', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])
    private episodes(req, res) {
    
        if (req.query.season_id) {
            Episode.findBySeasonID(req.query.season_id).then(episode => res.json(episode)).catch(error => res.send(error));
        } else if (req.query.episode_id) {
            Episode.findByEpisodeID(req.query.epsode_id).then(episode => res.json(episode)).catch(error => res.send(error));
        } else if (req.query.name) {
            Episode.findByEpisodeName(req.query.name).then(episode => res.json(episode)).catch(error => res.send(error));
        } else {
            Episode.loadAll().then(episode => res.json(episode)).catch(error => res.send(error));
        }
    }

    @Controller.delete('/:_id', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])
    private remove(req, res) {
        
        let id = req.params._id;        
        Episode.removeEpisodeByID(id).then(episode => res.json(episode));
        
    }

    public static checkEpisodeExist(req, res, next) {
        
        let id = req.body.episode_id;
        if (id){
            Episode.findByEpisodeID(id)
                .then((episode) => {
                    res.status(201);
                    next();
                })
                .catch(error => res.send(error));
            return;
        } else {
            res.status(400).send("Episode ID is null");
        }
    }
}