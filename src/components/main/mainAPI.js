/* eslint-disable */
import MainController from './mainController';
import express from 'express';
const router = express.Router();

class MainApi {
  constructor() {
    this.controller = new MainController();
  }

  loadRoutes() {
    router.get('/', this.controller.test);
    router.get('/error', this.controller.errorTest);
    return router;
  }
}

export default MainApi;
