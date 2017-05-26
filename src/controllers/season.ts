import { Router, Request, Response } from '@types/express';

import { Controller } from './controller';
import { Authenticator } from '../middleware/authenticator';
import { Season } from '../models/season';

export class SeasonController extends Controller {

    constructor(parentRouter : Router) {
        
        super('/season', parentRouter);
    }

    private register(req, res) {
        
        Season.save(req.body)
            .then(season => res.status(201).json(season));
    }

    private seasons(req, res) {
        
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

    private checkSeasonExist(req, res, next) {
        
        let id = req.body.season_id;

        Season.findBySeasonID(id)
            .then((season) => {
                res.status(201);
                next();
            })
            .catch(error => res.send(error));
        return;
    }

    private remove(req, res) {
        
        let id = req.params._id;    
        Season.removeSeasonByID(id).then(season => res.json(season));
    }

}
