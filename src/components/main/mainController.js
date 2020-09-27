import BaseController from '../../models/baseController';
import MainDAL from './mainDAL';
import { error, debug } from '../../helpers/logger';

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
    debug('DEBUGGING');
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
      // fake error.
      req.query.INVALID.map(x => x);
    } catch (err) {
      error({ location: 'mainController', error: err });
      MainController.sendBasicErrorResponse({
        res,
        reason: 'Testing errors in test endpoint',
      });
    }
  }
}

export default MainController;
