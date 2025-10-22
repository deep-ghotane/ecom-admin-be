import Joi from "joi";

const joiValidator = (schema, req, res, next) => {
  const { error } = schema.validate(req.body);
  error
    ? res.status(404).json({
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
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  joiValidator(createUserSchema, req, res, next);
};

export const createUserByAdminValidation = (req, res, next) => {
  let createUserByAdminSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid("admin", "superadmin").required(),
  });

  joiValidator(createUserByAdminSchema, req, res, next);
};

export const addProductValidation = (req, res, next) => {
  let addProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    category: Joi.string().required(),
    subCategory: Joi.string().required(),
  });

  joiValidator(addProductSchema, req, res, next);
};

export const updateProductValidation = (req, res, next) => {
  let { imagesToDelete } = req.body;
  if (!Array.isArray(imagesToDelete)) {
    imagesToDelete = imagesToDelete ? [imagesToDelete] : [];
  }
  req.body.imagesToDelete = imagesToDelete;
  let updateProductSchema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    stock: Joi.number(),
    category: Joi.string(),
    subCategory: Joi.string(),
    prevCategory: Joi.string(),
    imagesToDelete: Joi.array().items(Joi.string()),
  });

  joiValidator(updateProductSchema, req, res, next);
};

export const deleteProductValidation = (req, res, next) => {
  let deleteProductSchema = Joi.object({
    id: Joi.string().required(),
  });

  joiValidator(deleteProductSchema, req, res, next);
};

export const deleteCategoryValidation = (req, res, next) => {
  let deleteCategorySchema = Joi.object({
    id: Joi.string().required(),
  });

  joiValidator(deleteCategorySchema, req, res, next);
};

export const changeProductStatusValidation = (req, res, next) => {
  let changeProductStatusSchema = Joi.object({
    id: Joi.string().required(),
  });

  joiValidator(changeProductStatusSchema, req, res, next);
};

export const createCategoryValidation = (req, res, next) => {
  let createCategorySchema = Joi.object({
    name: Joi.string().required(),
    parent: Joi.alternatives().try(Joi.string(), Joi.valid(null)),
  });

  joiValidator(createCategorySchema, req, res, next);
};

export const updateCategoryValidation = (req, res, next) => {
  let updateCategorySchema = Joi.object({
    name: Joi.string().required(),
  });

  joiValidator(updateCategorySchema, req, res, next);
};
