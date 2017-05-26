import { Router, Request, Response } from 'express';

import { Authenticator } from '../middleware/authenticator';
import { Controller } from './controller';

export class AuthController extends Controller {
    
    constructor(parentRouter : Router) {
        super('/login', parentRouter);
    }

    @Controller.post('/', [Authenticator.authenticate, Authenticator.serialize, Authenticator.generateToken, Authenticator.sendAuthToken])
    private Login(req : Request, res : Response, next : Function) {
        res.status(200).send(res.json());
    }
}