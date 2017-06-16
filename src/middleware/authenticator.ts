import { Express, Request, Response} from "express";

import * as jwt from 'jsonwebtoken';
import * as expressJwt from 'express-jwt';
import * as passwordHash from 'password-hash';

import db from '../models/index';

export class Authenticator
{
    private static AUTH_HEADER_PREFIX = 'Bearer ';	

    public static generateToken(req : Request, res : Response, next : Function) {
        
        req.token = jwt.sign({
            id: req.body.userID
        }, 'server secret', {
            expiresIn: '7d'
        });
        db.AuthToken.create({token: req.token, userId: req.body.userID}).then(() => {
            req.userID = req.body.userID;
            next();
        }).catch(() => next());
    }

    public static sendAuthToken(req : Request, res : Response) {
        
        res.json({token: req.token});
    }

    public static checkAuthToken = expressJwt({secret: 'server secret'});

    public static extractAuthToken(req : Request) {
        
        let authHeader = req.get('Authorization');
        if (authHeader) {
            authHeader = authHeader.startsWith(this.AUTH_HEADER_PREFIX) ? authHeader.substr(this.AUTH_HEADER_PREFIX.length - 1)
            : authHeader;
            authHeader = authHeader.trim();
        }
        return authHeader;
    }

    public static sendInvalidAuthTokenError(res : Response) {
        
        res.status(401).send('Invalid access token');
    }

    public static checkAuthTokenValid(req : Request, res : Response, next : Function) {
        
        if(req.userID){
            let authtoken = Authenticator.extractAuthToken(req);
            if (authtoken) {
            db.AuthToken.findOne({where: {userId: req.userID}}).then((validToken : any) =>
                !validToken || authtoken !== validToken.token ? this.sendInvalidAuthTokenError(res) : next()).catch(() => next());
            } else {
                Authenticator.sendInvalidAuthTokenError(res);
            }
        } else {
            next();
        }
    }    
   
    public static logout(req : Request, res : Response, next : Function) {
        
        db.AuthToken.destroy({where: {userId: req.userID}}).then(() => {
            req.connection.destroy();
            res.send();
        }).catch(() => next());
    }
}

// Augment 'Request' with a user property
declare module "express"
{
	interface Request {
        userID? : any;
        token? : any;
	}
}
