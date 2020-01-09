import * as express from 'express';
import UserRouter from './userRouter';
import { IServer } from '../interfaces/serverInterface';


export default class Routes {
    /**
     * @param  {IServer} server
     * @returns void
     */
    static init(server: IServer): void {
        
        const router: express.Router = express.Router();

        server.app.use('/', router);
        
        server.app.use('/api/v1/users', new UserRouter().router);


    }
}
