// All complex business logic must be here
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AppError from '../../helpers/errors';

/**
 *  Validate user
 * @param {String} user
 * @param {String} password
 * @param {String} hash
 * @return {String} JWT Token
 */
export function validateUser({ username, password, hash }) {
  return new Promise(async (resolve, reject) => {
    try {
      const match = await bcrypt.compare(password, hash);
      if (match) {
        const payload = { username };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' }, (err, token) => {
          if (err) throw err;
          resolve(token);
        });
      } else {
        resolve(null);
      }
    } catch (error) {
      reject(error);
    }
  });
}
