import { Router, Request, Response } from '@types/express';

import { Controller } from './controller';
import { TrackController } from './track';

import { Authenticator } from '../middleware/authenticator';

import db from '../models/index';


export class TrackViewController extends Controller {

    constructor(parentRouter : Router) {
        
        super('/trackview', parentRouter);
    }
    
    @Controller.post('/', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid, TrackController.checkTrackExist])    
    private register(req : Request, res : Response) {
        db.TrackView.create(req.body).then((trackview) => res.status(201).send(trackview)).catch(() => res.status(400).send("Bad request"));
        return;
    }

    @Controller.get('/', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])    
    private trackviews(req, res) {
    
        if (req.query.trackId) {
            db.TrackView.findOne({where: {trackId: req.query.trackId}}).then(trackview => res.json(trackview)).catch(error => res.send(error));
        } else if (req.query.viewId) {
            db.TrackView.findById(req.query.viewId).then(trackview => res.json(trackview)).catch(error => res.send(error));
        } else if (req.query.name) {
            db.TrackView.findOne({where: {name: req.query.name}}).then(trackview => res.json(trackview)).catch(error => res.send(error));
        } else {
            db.TrackView.findAll().then(view => res.status(201).send(view)).catch(error => res.send("View not found"));
        }
        return;
    }

    @Controller.get('/:_id', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])
    private getTrackViewByID(req, res) {
        const id = req.params._id;
        db.View.findById(id).then(view => res.status(201).send(view)).catch(error => res.status(404).send("View not found"));
    }

    @Controller.put('/:_id', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])
    private update(req, res) {
        const id = req.params._id;
        const query = req.body;       
        db.TrackView.update(query, {where: {id: id}}).then(view => res.status(201).send(view)).catch(() => res.status(404).send("View not found"));
               
    }

    @Controller.delete('/:_id', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])    
    private remove(req, res) {
        
        let id = req.params._id;    
        db.TrackView.destroy({where: {id: id}}).then(trackview => res.json(trackview));

        return;   
    }
}