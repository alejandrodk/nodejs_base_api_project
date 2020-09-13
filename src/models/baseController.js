import { Failure, Success } from '../helpers/serverResponses';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

/**
 * All controllers must extends this class
 * @export
 * @class BaseController
 */
export default class BaseController {
  /**
   * Send Basic Success response with status 200
   * @param {Object} res Response Object
   * @param {Object} data User data
   * @return {Object} JSON Response
   * @memberof BaseController
   */
  static sendBasicOkResponse({ res, data }) {
    const message = new Success({
      message: ReasonPhrases.OK,
      status: StatusCodes.OK,
      data,
    });
    return res.status(message.status).json(message);
  }

  /**
   * Send Basic Error response with status 200
   * @param {Object} res Response Object
   * @param {String} reason Error Reason
   * @return {Object} JSON Response
   * @memberof BaseController
   */
  static sendBasicErrorResponse({ res, reason }) {
    const message = new Failure({
      reason,
      message: ReasonPhrases.OK,
      status: StatusCodes.OK,
    });
    return res.status(message.status).json(message);
  }

  /**
   * Send error if token validation failed
   * @param {Object} res Response Object
   * @return {Object} JSON Response
   * @memberof BaseController
   */
  static authenticationFailure({ res }) {
    const message = new Failure({
      reason: 'Invalid Token or user information',
      message: ReasonPhrases.UNAUTHORIZED,
      status: StatusCodes.UNAUTHORIZED,
    });
    return res.status(message.status).json(message);
  }

  /**
   * Send success response with user data
   * @param {Object} res Response Object
   * @param {Object} data User data
   * @return {Object} JSON Response
   * @memberof BaseController
   */
  static authenticationSuccess({ res, data }) {
    const message = new Success({
      message: ReasonPhrases.OK,
      status: StatusCodes.OK,
      data,
    });
    return res.status(message.status).json(message);
  }

  /**
   * Send error if JSON received in body is invalid
   * or missing fields
   * @param {Object} res Response Object
   * @return {Object} JSON Response
   * @memberof BaseController
   */
  static invalidJsonBody({ res }) {
    const message = new Failure({
      reason: 'Invalid JSON Structure',
      message: ReasonPhrases.BAD_REQUEST,
      status: StatusCodes.BAD_REQUEST,
    });
    return res.status(message.status).json(message);
  }
}
