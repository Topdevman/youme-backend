import { Express, Request, Response} from "express";

import * as jwt from 'jsonwebtoken';
import * as expressJwt from 'express-jwt';
import * as passwordHash from 'password-hash';

import { User } from "../models/user";
import { AuthToken } from '../models/auth';

export class Authenticator
{
    private static AUTH_HEADER_PREFIX = 'Bearer ';
   
	public static authenticate(req, res, next)
	{		
        let username = req.body.username;
        let password = req.body.password;

        User.findByUserName(username).then((user) => {
            req.user = user && passwordHash.verify(password, user.password) ? user :  null;
            next();
        });	
	}	

    public static generateToken(req : Request, res : Response, next : Function) {
        
        req.token = jwt.sign({
            id: req.user.id
        }, 'server secret', {
            expiresIn: '7d'
        });
        AuthToken.save(req.user.id, req.token).then(() => next()).catch(next);
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
        
        if (req.user) {
            let authtoken = Authenticator.extractAuthToken(req);
            if (authtoken) {
            AuthToken.findByUserID(req.user.id).then((validToken : any) =>
                !validToken || authtoken !== validToken.token ? this.sendInvalidAuthTokenError(res) : next()).catch(next);
            } else {
                Authenticator.sendInvalidAuthTokenError(res);
            }
        } else {
            next();
        }
    }

    public static serialize(req, res, next) {
        
        req.user = {
            id: req.user.id
        };
        next();
    }
   
    public static logout(req : Request, res : Response, next : Function) {
        
        AuthToken.clearUserSession(req.user.id).then(() => {
            req.connection.destroy();
            res.send();
        }).catch(next);
    }
}

// Augment 'Request' with a user property
declare module "express"
{
	interface Request {
		user? : any;
        token? : any;
	}
}
