import { error, debug } from '../../helpers/logger';

/**
 * Data Access Layer for Users Component
 * This layer interact directly with the database
 * and return methods for access to data
 * @class usersDAL
 */
class MainDAL {
  constructor(contextObject, model) {
    this.contextObject = contextObject;
    this.model = model;
  }
}

export default MainDAL;
