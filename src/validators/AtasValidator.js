const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      type: Joi.string().valid('ATAS', 'EDITAIS').required(),
      date: Joi.date().required(),
      description: Joi.string().required(),
      archive_1: Joi.string().optional(),
      archive_2: Joi.string().optional(),
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
      type: Joi.string().valid('ATAS', 'EDITAIS').optional(),
      date: Joi.date().optional(),
      description: Joi.string().optional(),
      archive_1: Joi.string().optional(),
      archive_2: Joi.string().optional(),
      }).min(1),
  }),

  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
  }),
};