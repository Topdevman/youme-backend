import { Router, Request, Response } from '@types/express';

import { Controller } from './controller';
import { Authenticator } from '../middleware/authenticator';
import { User } from '../models/user';

export class UserController extends Controller {

    constructor(parentRouter : Router) {
        
        super('/user', parentRouter);
    }

    @Controller.post('/register')
    private register(req : Request, res : Response) {

        User.save(req.body)
            .then(user => res.status(201).json(user));
    }

    @Controller.get('/', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])
    private users(req : Request, res : Response) {
            
        if (req.query.user_id) {
            User.findByUserID(req.query.user_id).then((user : any) => res.json(user)).catch((error : any) => res.send(error));
            return;
        } else if (req.query.name) {
            User.findByUserName(req.query.name).then((user : any) => res.json(user)).catch((error : any) => res.send(error));
            return;
        } else {
            User.loadAll().then((user : any) => res.json(user)).catch((error : any) => res.send(error));
            return;
        }
    }

    @Controller.delete('/', [Authenticator.checkAuthToken, Authenticator.checkAuthTokenValid])
    private remove(req : Request, res : Response) {
        
        let id = req.params._id;    
        User.removeUserByID(id).then((user : any) => res.json(user));
    }

    public static checkUserExist(req : Request, res : Response, next : Function) {
        
        let id = req.body.season_id;
        User.findByUserID(id)
            .then((user : any) => {
                res.status(201);
                next();
            })
            .catch((error : any) => res.send(error));
        return;
    }

}