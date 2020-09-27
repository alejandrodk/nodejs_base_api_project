import { error, debug } from '../../helpers/logger';

/**
 * Data Access Layer for Users Component
 * This layer interact directly with the database
 * and return methods for access to data
 * @class usersDAL
 */
export default class UsersDAL {
  constructor(contextObject) {
    this.contextObject = contextObject;
    this.model = 'model';
  }

  async getUserFromDB() {
    const { username } = this.contextObject;
    try {
      // const user = await this.model.findOne({
      //  where: { username },
      //  attributes: ['password', 'type'],
      // });
      const user = {
        username: 'johndoe',
        password: 'aef1a6faefa+fea48q4+d4+',
        type: 'admin',
      };
      return user || {};
    } catch (err) {
      error({ location: 'usersDAL', error: err });
    }
  }
}
