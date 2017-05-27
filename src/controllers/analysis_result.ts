import { Router, Request, Response } from '@types/express';

import { Controller } from './controller';
import { UserController } from './user';
import { StepController } from './step';

import { Authenticator } from '../middleware/authenticator';

import {AnalysisResult} from '../models/analysis_result';


export class AnalysisResultController extends Controller {

    constructor(parentRouter : Router) {
        
        super('/analysis', parentRouter);
    }
    
    @Controller.post('/', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid, UserController.checkUserExist, StepController.checkStepExist])
    private register(req, res) {
    
        const step_id = req.body.step_id;
        const user_id = req.body.user_id;
        const name = req.body.name;
        const result = req.body.result;
        AnalysisResult.save(step_id, user_id, name, result)
            .then(analysis_result => res.status(201).json(analysis_result))
            .catch(error => res.status(400));
        return;
    }

    @Controller.get('/', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])
    private analysis_results(req, res) {
    
        if (req.query.step_id) {
            AnalysisResult.findByStepID(req.query.step_id).then(analysis_result => res.json(analysis_result)).catch(error => res.send(error));
        } else if (req.query.user_id) {
            AnalysisResult.findByUserID(req.query.user_id).then(analysis_result => res.json(analysis_result)).catch(error => res.send(error));
        } else if (req.query.analysis_result_id) {
            AnalysisResult.findByUserID(req.query.analysis_result_id).then(analysis_result => res.json(analysis_result)).catch(error => res.send(error));
        } else if (req.query.name) {
            AnalysisResult.findByAnalysisResultName(req.query.name).then(analysis_result => res.json(analysis_result)).catch(error => res.send(error));
        } else {
            AnalysisResult.loadAll().then(analysys_result => res.json(analysys_result)).catch(error => res.send(error));
        }
    }

    @Controller.delete('/:_id', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])
    private remove(req, res) {
        
        let id = req.params._id;
        AnalysisResult.removeAnalysisResultByID(id).then(analysis_result => res.json(analysis_result));
    }
}
