const { celebrate, Segments, Joi } = require("celebrate");
var strongRegex = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

module.exports = {
  create: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.BODY]: Joi.object().keys({
      type: Joi.string().valid('administrador', 'usuario').required(),
      name: Joi.string().required(),
      user: Joi.string().required(),
      status: Joi.string().valid('A', 'E'),
      office: Joi.string().valid('JUIZ FEDERAL', 'JUIZ FEDERAL SUBSTITUTO', 'JUIZ FEDERAL APOSENTADO', 'DESEMBARGADOR FEDERAL', 'DESEMBARGADOR FEDERAL SUBSTITUTO', 'DESEMBARGADOR FEDERAL APOSENTADO').required(),
      nacionality: Joi.string().required(),
      cpf: Joi.string().required(),
      birth: Joi.date().required(),
      place_of_birth: Joi.string().required(),
      gender: Joi.string().valid('MASCULINO', 'FEMININO', 'OUTROS').required(),
      civil_state: Joi.string().valid('SOLTEIRO(A)', 'CASADO(A)', 'DIVORCIADO(A)', 'DESQUITADO(A)', 'OUTROS').required(),
      spouse: Joi.string().optional(),
      birth_spouse: Joi.date().optional(),
      sons: Joi.string().optional(),
      cep: Joi.string().required(),
      profissional_address: Joi.string().required(),
      profissional_number: Joi.number().required(),
      profissional_complement: Joi.string().optional(),
      profissional_district: Joi.string().required(),
      profissional_city: Joi.string().required(),
      profissional_state: Joi.string().required(),
      allocation: Joi.string().valid('TRF 5', 'CE', 'RN', 'PB', 'PE', 'AL', 'SE').required(),
      acting: Joi.string().required(),
      personal_cep: Joi.string(),
      personal_address: Joi.string(),
      personal_number: Joi.string(),
      personal_complement: Joi.string().optional(),
      personal_district: Joi.string(),
      personal_city: Joi.string(),
      personal_state: Joi.string(),
      telephone: Joi.string(),
      fax: Joi.string(),
      cell_phone_number: Joi.string().required(),
      email: Joi.string().email().required(),
      email_REJUFE: Joi.string().optional(),
      email_ASCOM: Joi.string().optional(),
      admission_date: Joi.date().required(),
    }),
  }),
  createExternalAssociate: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.BODY]: Joi.object().keys({
      type: Joi.string().valid('administrador', 'usuario').required(),
      name: Joi.string().required(),
      user: Joi.string().required(),
      status: Joi.string().valid('USUARIO EM ESPERA'),
      office: Joi.string().valid('JUIZ FEDERAL', 'JUIZ FEDERAL SUBSTITUTO', 'JUIZ FEDERAL APOSENTADO', 'DESEMBARGADOR FEDERAL', 'DESEMBARGADOR FEDERAL SUBSTITUTO', 'DESEMBARGADOR FEDERAL APOSENTADO').required(),
      nacionality: Joi.string().required(),
      cpf: Joi.string().required(),
      birth: Joi.date().required(),
      place_of_birth: Joi.string().required(),
      gender: Joi.string().valid('MASCULINO', 'FEMININO', 'OUTROS').required(),
      civil_state: Joi.string().valid('SOLTEIRO(A)', 'CASADO(A)', 'DIVORCIADO(A)', 'DESQUITADO(A)', 'OUTROS').required(),
      spouse: Joi.string().optional(),
      birth_spouse: Joi.date().optional(),
      sons: Joi.string().optional(),
      cep: Joi.string().required(),
      profissional_address: Joi.string().required(),
      profissional_number: Joi.number().required(),
      profissional_complement: Joi.string().optional(),
      profissional_district: Joi.string().required(),
      profissional_city: Joi.string().required(),
      profissional_state: Joi.string().required(),
      allocation: Joi.string().valid('TRF 5', 'CE', 'RN', 'PB', 'PE', 'AL', 'SE').required(),
      acting: Joi.string().required(),
      personal_cep: Joi.string(),
      personal_address: Joi.string(),
      personal_number: Joi.string(),
      personal_complement: Joi.string().optional(),
      personal_district: Joi.string(),
      personal_city: Joi.string(),
      personal_state: Joi.string(),
      telephone: Joi.string(),
      fax: Joi.string(),
      cell_phone_number: Joi.string().required(),
      email: Joi.string().email().required(),
      email_REJUFE: Joi.string().optional(),
      email_ASCOM: Joi.string().optional(),
      admission_date: Joi.date().required(),
    }),
  }),

  getAll: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.QUERY]: Joi.object().keys({
      times: Joi.number().integer().required(),
      field: Joi.string().allow(null, ''),
      filter: Joi.string().allow(null, ''),
      consultFlag: Joi.bool().allow(null),
    }),
  }),

  getByAllocation: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.QUERY]: Joi.object().keys({
      filter: Joi.allow(null, ''),
      times: Joi.number().integer().required(),
      field: Joi.string().allow(null, ''),
    }),
  }),

  getExternalAssociates: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
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

  getExternalUserById: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),

  getUserEmailByUsername: celebrate({
    [Segments.BODY]: Joi.object().keys({
      user: Joi.string().required(),
    }),
  }),

  getUserEmailByCpf: celebrate({
    [Segments.BODY]: Joi.object().keys({
      cpf: Joi.string().required(),
    }),
  }),

  getExcludedAssociate: celebrate({
    [Segments.BODY]: Joi.object().keys({
      status: Joi.string().required(),
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
      firebaseId: Joi.string(),
      type: Joi.string().valid('administrador', 'usuario').insensitive(),
      status: Joi.string().valid('A', 'E'),
      name: Joi.string(),
      user: Joi.string(),
      office: Joi.string().valid('JUIZ FEDERAL', 'JUIZ FEDERAL SUBSTITUTO', 'JUIZ FEDERAL APOSENTADO', 'DESEMBARGADOR FEDERAL', 'DESEMBARGADOR FEDERAL SUBSTITUTO', 'DESEMBARGADOR FEDERAL APOSENTADO'),
      nacionality: Joi.string(),
      cpf: Joi.string(),
      birth: Joi.date(),
      place_of_birth: Joi.string(),
      gender: Joi.string().valid('MASCULINO', 'FEMININO', 'OUTROS').insensitive(),
      civil_state: Joi.string().valid('SOLTEIRO(A)', 'CASADO(A)', 'DIVORCIADO(A)', 'DESQUITADO(A)', 'OUTROS').insensitive(),
      spouse: Joi.string().optional(),
      birth_spouse: Joi.date().optional(),
      sons: Joi.string().optional(),
      cep: Joi.string(),
      profissional_address: Joi.string(),
      profissional_number: Joi.number(),
      profissional_complement: Joi.string().optional(),
      profissional_district: Joi.string(),
      profissional_city: Joi.string(),
      profissional_state: Joi.string(),
      allocation: Joi.string().valid('TRF 5', 'CE', 'RN', 'PB', 'PE', 'AL', 'SE'),
      acting: Joi.string(),
      personal_cep: Joi.string(),
      personal_address: Joi.string(),
      personal_number: Joi.number(),
      personal_complement: Joi.string().optional(),
      personal_district: Joi.string(),
      personal_city: Joi.string(),
      personal_state: Joi.string(),
      telephone: Joi.string().optional(),
      fax: Joi.string().optional(),
      cell_phone_number: Joi.string(),
      email: Joi.string().email(),
      email_REJUFE: Joi.string().optional(),
      email_ASCOM: Joi.string().optional(),
      admission_date: Joi.date(),
      status: Joi.string(),
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

  deleteExternalAssociate: celebrate({
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
