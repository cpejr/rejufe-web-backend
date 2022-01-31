const { celebrate, Segments, Joi } = require("celebrate");


module.exports = {
  create: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.BODY]: Joi.object().keys({
      section: Joi.string().valid('SITE', 'INTRANET').optional(),
      type: Joi.string().valid('ARTIGO', 'NOTÍCIAS').optional(),
      title: Joi.string().required(),
      description: Joi.string().required(),
      archive_1: Joi.string().optional(),
      archive_2: Joi.string().optional(),
      photos: Joi.string().optional(),
      status: Joi.string().valid('I', 'A').required(),
      send_site: Joi.boolean(),
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
      section: Joi.string().valid('SITE', 'INTRANET').insensitive(),
      type: Joi.string().valid('ARTIGO', 'NOTÍCIAS').insensitive(),
      title: Joi.string(),
      description: Joi.string(),
      archive_1: Joi.string(),
      archive_2: Joi.string(),
      photos: Joi.string(),
      status: Joi.string().valid('I', 'A').insensitive(),
      send_site: Joi.boolean(),
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