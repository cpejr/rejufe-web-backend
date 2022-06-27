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
      archive_1: Joi.string().allow('').optional(),
      archive_2: Joi.string().allow('').optional(),
      photos: Joi.string().allow('').optional(),
      status: Joi.string().valid('I', 'A').required(),
      send_site: Joi.boolean(),
    }),
  }),
  getAll: celebrate({
    [Segments.QUERY]: Joi.object().keys({
      times: Joi.number().integer().required(),
      field: Joi.string().allow(null, ''),
      filter: Joi.allow(null, ''),
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
      archive_1: Joi.string().allow(''),
      archive_2: Joi.string().allow(''),
      photos: Joi.string().allow(''),
      status: Joi.string().valid('I', 'A').insensitive(),
      send_site: Joi.boolean(),
      _id: Joi.string(),
      date: Joi.date(),
      news_sequential_id: Joi.string(),
      __v: Joi.string(),
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