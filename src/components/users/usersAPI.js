/* eslint-disable */
import UsersController from './usersController';
import express from 'express';
import authToken from '../../middlewares/jwt';
import { loginFormValidation } from '../../middlewares/jsonValidation';

const router = express.Router();

class UsersApi {
  constructor() {
    this.controller = new UsersController();
  }

  loadRoutes() {
    router.get('/', authToken, this.controller.test);
    router.post('/login', loginFormValidation, this.controller.login);
    return router;
  }
}

export default UsersApi;
