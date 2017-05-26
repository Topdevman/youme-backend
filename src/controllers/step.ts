import { Router, Request, Response } from '@types/express';

import { Controller } from './controller';
import { Authenticator } from '../middleware/authenticator';
import { Step } from '../models/step';

export class StepController extends Controller {

    constructor(parentRouter : Router) {
        
        super('/step', parentRouter);
    }

    private register(req : Request, res : Response) {
    
        const moment_id = req.body.moment_id;
        const name = req.body.name;
        Step.save(moment_id, name)
            .then(step => res.status(201).json(step))
            .catch(error => res.status(400));
        return;
    }

    private steps(req : Request, res : Response) {
    
        if (req.query.moment_id) {
            Step.findByMomentID(req.query.moment_id).then(step => res.json(step)).catch(error => res.send(error));
        } else if (req.query.step_id) {
            Step.findByStepID(req.query.step_id).then(step => res.json(step)).catch(error => res.send(error));
        } else if (req.query.name) {
            Step.findByStepName(req.query.name).then(step => res.json(step)).catch(error => res.send(error));
        } else {
            Step.loadAll().then(step => res.json(step)).catch(error => res.send(error));
        }
    }

    private remove(req : Request, res : Response) {
        
        let id = req.params._id;    
        Step.removeStepByID(id).then(step => res.json(step));
    }

    private checkStepExist(req : Request, res : Response, next : Function) {
        let id = req.body.step_id;
        
        Step.findByStepID(id)
            .then((step) => {
                res.status(201);
                next();
            })
            .catch(error => res.send(error));
        return;
    }
}