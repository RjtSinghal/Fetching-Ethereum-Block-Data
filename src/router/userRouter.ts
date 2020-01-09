import UserController from '../controllers/userController';
import { Router } from 'express';
/**
 * @class UserRouter
 */
export default class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.get('/block', UserController.getBlockData);
        this.router.get('/tx', UserController.getTxData);
    }
}
