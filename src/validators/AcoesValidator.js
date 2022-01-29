const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
  create: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.BODY]: Joi.object().keys({
      type: Joi.string().valid('ADMINISTRATIVAS', 'JUDICIAIS').required(),
      date: Joi.date().required(),
      description: Joi.string().required(),
      archive_1: Joi.string().optional(),
      archive_2: Joi.string().optional(),
    }),
  }),

  getById: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),

  update: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
        type: Joi.string().valid('ADMINISTRATIVAS', 'JUDICIAIS').optional(),
        date: Joi.date().optional(),
        description: Joi.string().optional(),
        archive_1: Joi.string().optional(),
        archive_2: Joi.string().optional(),
      }).min(1),
  }),

  delete: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
  }),
};