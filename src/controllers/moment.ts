import { Router, Request, Response } from '@types/express';

import { Controller } from './controller';
import { EpisodeController } from './episode';

import { Authenticator } from '../middleware/authenticator';

import { Moment } from '../models/moment';


export class MomentController extends Controller {

    constructor(parentRouter : Router) {
        
        super('/moment', parentRouter);
    }

    @Controller.post('/', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid, EpisodeController.checkEpisodeExist])
    private register(req, res) {
    
        const epsode_id = req.body.episode_id;
        const name = req.body.name;
        Moment.save(epsode_id, name)
            .then(moment => res.status(201).json(moment))
            .catch(error => res.status(400));
        return;
    }

    @Controller.get('/', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])
    private moments(req, res) {
    
        if (req.query.episode_id) {
            Moment.findByEpisodeID(req.query.episode_id).then(moment => res.json(moment)).catch(error => res.send(error));
        } else if (req.query.moment_id) {
            Moment.findByMomentID(req.query.moment_id).then(moment => res.json(moment)).catch(error => res.send(error));
        } else if (req.query.name) {
            Moment.findByMomentName(req.query.name).then(moment => res.json(moment)).catch(error => res.send(error));
        } else {
            Moment.loadAll().then(moment => res.json(moment)).catch(error => res.send(error));
        }
    }

    @Controller.delete('/:_id', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])
    private remove(req, res) {
        
        console.log(req.params._id)
        let id = req.params._id;    
        Moment.removeMomentByID(id).then(moment => res.json(moment)).catch(error => res.send(error));
    }

    public static checkMomentExist(req, res, next) {
        let id = req.body.moment_id;
        
        if (id) {
            Moment.findByMomentID(id)
                .then((moment) => {
                    res.status(201);
                    next();
                })
                .catch(error => res.send(error));
            return;
        } else {
            res.status(401).send('Moment ID is null');
        }
    }
}