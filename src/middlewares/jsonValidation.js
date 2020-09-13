import Joi from 'joi';

export function loginFormValidation(req, res, next) {
  const data = req.body;

  const schema = Joi.object({
    username: Joi.string().min(5).required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(data);
  req.body.valid = error ? false : true;
  next();
}
