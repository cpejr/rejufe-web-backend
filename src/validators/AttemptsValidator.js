const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
  create: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required(),
      quantity: Joi.number().optional(),
      lock_time: Joi.date().optional(),
    }),
  }),

  getAttemptsByEmail: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      email: Joi.string().required(),
    }),
  }),

  deleteByEmail: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      email: Joi.string().required(),
    }),
  }),

  updateAttemptsByEmail: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      email: Joi.string().required(),
    }),
  }),

  updateTimeByEmail: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      email: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      quantity: Joi.number().optional(),
      lock_time: Joi.date().optional(),
    }),
  }),
};