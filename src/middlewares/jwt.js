import jwt from 'jsonwebtoken';

/**
 * Validate JWT Token and send to
 * controller inside the request
 * @export
 * @param {*} req request
 * @param {*} res response
 * @param {*} next next
 * @return {*} Decoded JWT
 */
export default function authToken(req, res, next) {
  if (process.env.JWT_ENABLE === 'false') {
    // turn JWT_ENABLE in false for develop environment
    return next();
  }
  // const token = req.headers['x-access-token'] || req.headers.authorization;
  const token = req.header('token');

  if (!token) {
    return res.status(res.statusCode).json({
      message: 'Authentication Failed',
      description: 'Validation token not found',
    });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(res.statusCode).json({
          message: 'Authentication Failed',
          error: err,
        });
      }
      req.jwt = decoded;
      next();
    });
  } catch (err) {
    return res.status(401).json({
      message: 'Authentication Failed',
      description: 'Token validation failed',
      error: err,
    });
  }
}
