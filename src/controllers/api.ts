import { Application, Request, Response, Router } from "express";
import { Controller } from "./Controller";
import { UserController } from "./user";
import { EpisodeController } from './episode';
import { MomentController } from './moment';
import { SeasonController } from './season';
import { StepController } from './step';
import { StepProgressController } from './step_progress';
import { AuthController } from './auth';
import { AnalysisResultController } from './analysis_result';

export class APIController extends Controller
{
	constructor(app : Application)
	{
		super("/", app);
		let userController = new UserController(this.router);
		let authController = new AuthController(this.router);
		let seasonController = new SeasonController(this.router);
		let episodeController = new EpisodeController(this.router);
		let momentController = new MomentController(this.router);
		let stepController = new StepController(this.router);
		let stepProgressController = new StepProgressController(this.router);
		let analysisResultController = new AnalysisResultController(this.router);
	}
}
