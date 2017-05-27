import { Router, Request, Response } from '@types/express';

import { Controller } from './controller';
import { UserController } from './user';
import { StepController } from './step';

import { Authenticator } from '../middleware/authenticator';

import { StepProgress } from '../models/step_progress';


export class StepProgressController extends Controller {

    constructor(parentRouter : Router) {
        
        super('/progress', parentRouter);
    }

    @Controller.post('/', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid, UserController.checkUserExist, StepController.checkStepExist])
    private register(req, res) {
    
        const step_id = req.body.step_id;
        const user_id = req.body.user_id;
        const name = req.body.name;
        StepProgress.save(step_id, user_id, name)
            .then(step_progress => res.status(201).json(step_progress))
            .catch(error => res.status(400));
        return;
    }

    @Controller.get('/', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])
    private StepProgresses(req, res) {
    
        if (req.query.step_id) {
            StepProgress.findByStepID(req.query.step_id).then(step_progress => res.json(step_progress)).catch(error => res.send(error));
        } else if (req.query.user_id) {
            StepProgress.findByUserID(req.query.user_id).then(step_progress => res.json(step_progress)).catch(error => res.send(error));
        } else if (req.query.StepProgress_id) {
            StepProgress.findByStepProgressID(req.query.step_progress_id).then(step_progress => res.json(step_progress)).catch(error => res.send(error));
        } else if (req.query.name) {
            StepProgress.findByStepProgressName(req.query.name).then(step_progress => res.json(step_progress)).catch(error => res.send(error));
        } else {
            StepProgress.loadAll().then(step_progress => res.json(step_progress)).catch(error => res.send(error));
        }
    }

    @Controller.delete('/:_id', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])
    private remove(req, res) {
        
        let id = req.params._id;    
        StepProgress.removeStepProgressByID(id).then(step_progress => res.json(step_progress));
    }
}