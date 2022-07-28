const { celebrate, Segments, Joi } = require("celebrate");


module.exports = {
  create: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      toVote: Joi.array().required(),
      alreadyVoted: Joi.array().required(),
      openingDate: Joi.date().required(),
      closingDate: Joi.date().required(),
      options: Joi.array().required(),
      privateResult: Joi.boolean().required(),
    }),
  }),
  
  getAll: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.QUERY]: Joi.object().keys({
      date: Joi.date().required(),
      times: Joi.number().integer().required(),
      field: Joi.string().allow(null, ''),
      filter: Joi.allow(null, ''),
    }),
  }),

  getToVoteQuizzes: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string(),
      })
      .unknown(),
    [Segments.QUERY]: Joi.object().keys({
      date: Joi.date().required(),
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
      title: Joi.string().optional(),
      description: Joi.string().optional(),
      toVote: Joi.array().optional(),
      alreadyVoted: Joi.array().optional(),
      openingDate: Joi.date().optional(),
      closingDate: Joi.date().optional(),
      options: Joi.array().optional(),
      privateResult: Joi.boolean().optional(),
    }).min(1),
  }),

  updateVote: celebrate({
    [Segments.HEADERS]: Joi.object()
      .unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      toVote: Joi.array().optional(),
      alreadyVoted: Joi.array().optional(),
      options: Joi.array().optional(),
    }).min(1),
  }),

  updateVotes: celebrate({
    [Segments.HEADERS]: Joi.object()
      .unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      index: Joi.number().required(),
    })
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