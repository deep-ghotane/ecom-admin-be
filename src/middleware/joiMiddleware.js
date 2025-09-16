import Joi from "joi";

const joiValidator = (schema, req, res, next) => {
  const { error } = schema.validate(req.body);
  error
    ? res.json({
        status: "error",
        message: error.message,
      })
    : next();
};

export const loginValidation = (req, res, next) => {
  let loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  joiValidator(loginSchema, req, res, next);
};

export const createUserValidation = (req, res, next) => {
  let createUserSchema = Joi.object({
    // name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  joiValidator(createUserSchema, req, res, next);
};
