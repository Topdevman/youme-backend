import { Application, Request, Response, Router } from "express";
import { Controller } from "./Controller";
import { EpisodeController } from './episode';
import { MomentController } from './moment';
import { SeasonController } from './season';
import { TrackController } from './track';
import { ViewController } from "./view";
import { AuthController } from './auth';
import { TrackViewController } from './trackview';

export class APIController extends Controller
{
	constructor(app : Application)
	{
		app.use((req, res, next) => {
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
			res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Accept, Authorization');
			res.setHeader('Access-Control-Allow-Credentials', 'true');
			next();
		});
		super("/", app);
		
		// let userController = new UserController(this.router);
		let authController = new AuthController(this.router);
		let seasonController = new SeasonController(this.router);
		let episodeController = new EpisodeController(this.router);
		let momentController = new MomentController(this.router);
		let trackController = new TrackController(this.router);
		let viewController = new ViewController(this.router);
		let trackViewController = new TrackViewController(this.router);
	}
}
