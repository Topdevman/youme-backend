import { User } from '../models/user';
import { Season } from '../models/season';
import { Episode } from '../models/episode';
import { Moment } from '../models/moment';
import { Step } from '../models/step';
import { StepProgress } from '../models/step_progress';
import { AnalysisResult } from '../models/analysis_result';
import { AuthToken } from '../models/auth';

import sequelize from '../models/index';


export class Migrate {

    constructor() {
        
        let user = new User();
        let season = new Season();
        let episode = new Episode();
        let moment = new Moment();
        let step = new Step();
        let stepProgress = new StepProgress();
        let analysisResult= new AnalysisResult();
        let authToken = new AuthToken();

        sequelize.sync({force: false}).then(() => {
            User.init();
        });
    }
    
}

