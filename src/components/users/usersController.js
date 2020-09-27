import BaseController from '../../models/baseController';
import UsersDAL from './usersDAL';
import { validateUser } from './usersService';
import { error, debug } from '../../helpers/logger';

class UsersController extends BaseController {
  constructor() {
    super();
    // Bind functions to use BaseController methods
    this.test = this.test.bind(this);
    this.login = this.login.bind(this);
  }
  /**
   * Test response
   * @param {*} req
   * @param {*} res
   */
  test(req, res) {
    UsersController.sendBasicOkResponse({
      res,
      data: 'Hello World from Users!!',
    });
  }
  /**
   * Validate user login
   * @param {*} req
   * @param {*} res
   * @return {*} JSON Response
   */
  async login(req, res) {
    const { username, password, valid } = req.body;

    if (!valid) {
      return UsersController.invalidJsonBody({ res });
    }
    // create context with all data necesary from
    // the request and send it to Data Access Layer
    // to apply business logic
    const context = { username };
    const DAL = new UsersDAL(context);

    try {
      const userdata = await DAL.getUserFromDB();
      const { password: hash=null, type=null } = userdata;
      const token = userdata && await validateUser({ username, password, hash });
      if (userdata && token) {
        const data = { username, type, token };
        return token && UsersController.authenticationSuccess({ res, data });
      }
      return UsersController.authenticationFailure({ res });
    } catch (err) {
      error({ location: 'usersController', error: err });
      return UsersController.sendBasicErrorResponse({
        res,
        reason: 'Error occurred in user validation',
      });
    }
  }
}

export default UsersController;
