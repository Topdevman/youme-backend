import { Router, Request, Response } from '@types/express';

import { Controller } from './controller';
import { EpisodeController } from './episode';

import { Authenticator } from '../middleware/authenticator';

import db from '../models/index';


export class TrackController extends Controller {

    constructor(parentRouter : Router) {
        
        super('/track', parentRouter);
    }
    
    @Controller.post('/', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid, EpisodeController.checkEpisodeExist])    
    private register(req : Request, res : Response) {
        db.Track.create(req.body).then(track => res.status(201).send(track))
                    .catch(error => res.status(404).send(error));
        return;
    }

    @Controller.get('/', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])    
    private tracks(req, res) {
    
        if (req.query.episodeId) {
            db.Track.findOne({where: {episodeId: req.query.episodeId}}).then(moment => res.json(moment)).catch(error => res.send(error));
        } else if (req.query.name) {
            db.Track.findOne({where: {name: req.query.name}}).then(track => res.json(track)).catch(error => res.send(error));
        } else {
            db.Track.findAll({
                include: [{
                    model: db.TrackView,
                    as: 'views'
                }]
            }).then(track => res.json(track)).catch(error => res.send(error));
        }
    }

    @Controller.get('/:_id', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])
    private getTrackById(req, res, next) {       
        const id = req.params._id;
        db.Track.findById(id, {
            include: [{
                model: db.TrackView,
                as: 'views',                
            }]
        }).then(view => res.status(201).send(view)).catch(() => res.status(404).send("View not found"));
    }

    @Controller.put('/:_id', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])
    private update(req, res) {
        const id = req.params._id;
        const query = req.body;       
        db.Track.update(query, {where: {id: id}}).then(track => res.status(201).send(track)).catch(() => res.status(404).send("Track not found"));
           
    }

    @Controller.delete('/:_id', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])    
    private remove(req, res) {
        
        let id = req.params._id;    
        db.Track.destroy({where: {id: id}}).then(track => res.status(201).send(track)).catch(() => res.status(404).send("Track not found"));

        return;   
    }

    public static checkTrackExist(req, res, next) {
        
        let id = req.body.trackId;
        if (id){
            db.Track.findById(id)
                .then((track) => {
                    res.status(201);
                    next();
                })
                .catch(error => res.send(error));
            return;
        } else {
            res.status(400).send("Track ID is not exist");
        }
    }
}