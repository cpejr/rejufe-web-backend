const { celebrate, Segments, Joi } = require("celebrate");


module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      description: Joi.string().required(),
      toVote: Joi.string().required(),
      alreadyVoted: Joi.string().required(),
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
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),

  update: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      description: Joi.string().optional(),
      toVote: Joi.string().optional(),
      alreadyVoted: Joi.string().optional(),
    }).min(1),
  }),

  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
};