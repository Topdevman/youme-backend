import { Router, Request, Response } from 'express';

import { Controller } from './controller';

import { Authenticator } from '../middleware/authenticator';

export class AuthController extends Controller {
    
    constructor(parentRouter : Router) {
        super('/login', parentRouter);
    }

    @Controller.post('/', [Authenticator.generateToken, Authenticator.sendAuthToken])
    private Login(req : Request, res : Response, next : Function) {
        res.status(200).send(res.json());
    }
}