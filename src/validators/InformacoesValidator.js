const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      number: Joi.number().required(),
      description: Joi.string().required(),
      type: Joi.string().valid('INFORMATIVO', 'COMUNICADO').required(),
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
        number: Joi.number().optional(),
        description: Joi.string().optional(),
        type: Joi.string().valid('INFORMATIVO', 'COMUNICADO').optional(),
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