const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      message: Joi.string().required(),
    }),
  }),

  getById: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),

  update: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().optional(),
        email: Joi.string().email().optional(),
        message: Joi.string().optional(),
      }).min(1),
  }),

  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
  }),
};