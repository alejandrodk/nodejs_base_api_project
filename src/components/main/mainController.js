import BaseController from '../../models/baseController';
import MainDAL from './mainDAL';
import AppError from '../../helpers/errors';
import logger from '../../helpers/logger';

class MainController extends BaseController {
  constructor() {
    super();
    // Bind functions to use BaseController methods
    this.test = this.test.bind(this);
    this.errorTest = this.errorTest.bind(this);
  }
  /**
   * Test response
   * @param {*} req
   * @param {*} res
   */
  test(req, res) {
    MainController.sendBasicOkResponse({
      res,
      data: 'Hello World from Main!!',
    });
  }

  /**
   * Example of how handle errors
   * @param {*} req
   * @param {*} res
   */
  errorTest(req, res) {
    try {
      throw new Error('Testing error');
    } catch (error) {
      const apiError = new AppError({
        description: 'Testing errors in test endpoint',
        isOperational: 'false',
        error,
        stack: false,
      });
      logger(apiError);
      MainController.sendBasicErrorResponse({
        res,
        reason: 'Testing errors in test endpoint',
      });
    }
  }
}

export default MainController;
